// Database Configuration
const DB_CONFIG = {
    host: '192.168.2.10',
    database: 'arkham_asylum',
    table: 'arkham_prisoners'
};

// Static prisoner data for display
// Replace image filenames with your PNG files in the images/ folder
const prisonersData = [
    {
        prisoner: "The Joker",
        alias: "Unknown",
        cell_block: "A1",
        security: "Max",
        diagnosis: "Antisocial personality disorder",
        dossier: "joker_casefile.txt",
        status: "In custody",
        notes: "High escape risk; confiscate trick items",
        image: "images/joker.png"
    },
    {
        prisoner: "Harley Quinn",
        alias: "Dr. Harleen Quinzel",
        cell_block: "A2",
        security: "High",
        diagnosis: "Histrionic personality disorder",
        dossier: "quinn_casefile.txt",
        status: "In custody",
        notes: "Former psychiatrist; accomplice to Joker; unpredictable behavior",
        image: "images/harley.png"
    },
    {
        prisoner: "Two-Face",
        alias: "Harvey Dent",
        cell_block: "B3",
        security: "Medium",
        diagnosis: "Dissociative identity disorder",
        dossier: "dent_casefile.txt",
        status: "In custody",
        notes: "Coin confiscated; therapy sessions twice weekly",
        image: "images/twoface.png"
    },
    {
        prisoner: "The Riddler",
        alias: "Edward Nygma",
        cell_block: "B4",
        security: "Medium",
        diagnosis: "Narcissistic personality disorder",
        dossier: "riddler_casefile.txt",
        status: "In custody",
        notes: "Monitor all communications for coded messages; compulsive riddle-making",
        image: "images/riddler.png"
    },
    {
        prisoner: "Scarecrow",
        alias: "Dr. Jonathan Crane",
        cell_block: "C5",
        security: "High",
        diagnosis: "Paranoid schizophrenia",
        dossier: "crane_casefile.txt",
        status: "In custody",
        notes: "Keep sedated; fear toxin research confiscated",
        image: "images/scarecrow.png"
    },
    {
        prisoner: "Bane",
        alias: "Unknown",
        cell_block: "C6",
        security: "Max",
        diagnosis: "Venom dependency",
        dossier: "bane_casefile.txt",
        status: "In custody",
        notes: "No Venom access; regular strength monitoring",
        image: "images/bane.png"
    },
    {
        prisoner: "Poison Ivy",
        alias: "Dr. Pamela Isley",
        cell_block: "D7",
        security: "High",
        diagnosis: "Chlorokinetic mutation",
        dossier: "ivy_casefile.txt",
        status: "In custody",
        notes: "No plant contact; pheromone-filtered cell",
        image: "images/ivy.png"
    },
    {
        prisoner: "Mr. Freeze",
        alias: "Dr. Victor Fries",
        cell_block: "D8",
        security: "High",
        diagnosis: "Cryogenic dependency",
        dossier: "freeze_casefile.txt",
        status: "In custody",
        notes: "Cryo-cell required; monitor temperature constantly",
        image: "images/freeze.png"
    },
    {
        prisoner: "Killer Croc",
        alias: "Waylon Jones",
        cell_block: "E9",
        security: "Max",
        diagnosis: "Atavism with reptilian mutation",
        dossier: "croc_casefile.txt",
        status: "In custody",
        notes: "Reinforced containment; extreme aggression; feed through secure slot only",
        image: "images/croc.png"
    },
    {
        prisoner: "Ra's al Ghul",
        alias: "Unknown (The Demon's Head)",
        cell_block: "F10",
        security: "Max",
        diagnosis: "Megalomania with immortality complex",
        dossier: "alghul_casefile.txt",
        status: "In custody",
        notes: "League of Assassins threat; maximum security; no visitors without clearance",
        image: "images/rasalghul.png"
    }
];

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const queryDisplay = document.getElementById('queryDisplay');
const sqlQuery = document.getElementById('sqlQuery');
const prisonersGrid = document.getElementById('prisonersGrid');
const prisonerModal = document.getElementById('prisonerModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.querySelector('.close-modal');

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});
closeModal.addEventListener('click', () => {
    prisonerModal.classList.add('hidden');
});
window.addEventListener('click', (e) => {
    if (e.target === prisonerModal) {
        prisonerModal.classList.add('hidden');
    }
});

// Handle search - construct vulnerable SQL query
function handleSearch() {
    const userInput = searchInput.value.trim();
    
    if (!userInput) {
        alert('Please enter a prisoner name to search');
        return;
    }
    
    // Intentionally vulnerable SQL query construction
    const query = `SELECT * FROM ${DB_CONFIG.table} WHERE prisoner = '${userInput}'`;
    
    // Display the query
    sqlQuery.textContent = query;
    queryDisplay.style.display = 'block';
    
    // Note: This is where you would verify against your existing database at 10.10.1.2
    // For now, we're just displaying the query that would be executed
    console.log('Query to be executed against database:', query);
    console.log('Database server:', DB_CONFIG.host);
    console.log('Database name:', DB_CONFIG.database);
}

// Render static prisoner cards
function renderPrisoners() {
    prisonersGrid.innerHTML = '';
    
    prisonersData.forEach(prisoner => {
        const card = document.createElement('div');
        card.className = 'prisoner-card';
        card.innerHTML = `
            <div class="prisoner-image">
                ${prisoner.image ? `<img src="${prisoner.image}" alt="${prisoner.prisoner}" onerror="this.parentElement.innerHTML = generatePlaceholderSVG('${prisoner.prisoner}')">` : generatePlaceholderSVG(prisoner.prisoner)}
            </div>
            <div class="prisoner-info">
                <h3 class="prisoner-name">${prisoner.prisoner}</h3>
                <div class="prisoner-meta">
                    <span class="alias">Alias: ${prisoner.alias}</span>
                    <span class="cell-block">Cell Block: ${prisoner.cell_block}</span>
                    <span class="security">Security: ${prisoner.security}</span>
                </div>
            </div>
        `;
        
        card.addEventListener('click', () => showPrisonerDetails(prisoner));
        prisonersGrid.appendChild(card);
    });
}

// Show prisoner details in modal
function showPrisonerDetails(prisoner) {
    // Create enhanced villain profile with additional static information
    const criminalHistory = {
        "The Joker": "First appeared during a chemical plant heist. Known for elaborate schemes involving playing cards, deadly laughing gas, and theatrical crimes. Estimated body count: Unknown. Arch-nemesis of Batman.",
        "Harley Quinn": "Former Arkham Asylum psychiatrist who fell in love with the Joker during treatment sessions. Became his accomplice and girlfriend. Expert gymnast with proficiency in various weapons.",
        "Two-Face": "Former Gotham City District Attorney. Scarred by acid during trial, developed obsession with duality. All decisions made by coin flip. Once Batman's ally, now one of his greatest foes.",
        "The Riddler": "Compulsive need to prove intellectual superiority through elaborate riddles and puzzles. Former question-mark obsessed game designer. Leaves clues at every crime scene.",
        "Scarecrow": "Former psychiatrist who weaponized fear toxin. Specializes in psychological warfare. Uses burlap mask and scythe. Notable for mass fear gas attacks on Gotham City.",
        "Bane": "Enhanced strength through experimental Venom drug. Broke Batman's back in infamous Knightfall incident. Genius-level intellect combined with superhuman strength.",
        "Poison Ivy": "Eco-terrorist with plant-based powers and immunity to toxins. Can control plant life and produce deadly toxins. Known for using pheromones to control victims.",
        "Mr. Freeze": "Cryogenics expert seeking cure for terminally ill wife Nora. Requires sub-zero temperatures to survive. Armed with freeze gun capable of instant cryogenic suspension.",
        "Killer Croc": "Born with rare genetic condition causing reptilian appearance and enhanced abilities. Former sideshow wrestler turned criminal. Possesses superhuman strength and regenerative abilities.",
        "Ra's al Ghul": "Centuries-old eco-terrorist leader of the League of Assassins. Seeks to cleanse humanity through destruction. Uses Lazarus Pits for immortality. Considers Batman worthy heir."
    };

    const knownAbilities = {
        "The Joker": "Expert chemist, unpredictable behavior, immunity to most toxins, skilled hand-to-hand combatant",
        "Harley Quinn": "Olympic-level gymnast, proficient with baseball bat and mallet, immunity to toxins, psychological manipulation",
        "Two-Face": "Expert marksman, skilled lawyer, criminal mastermind, dual-wielding weapons specialist",
        "The Riddler": "Genius-level intellect, master puzzle creator, expert engineer, computer hacking skills",
        "Scarecrow": "Master of fear, expert in psychology and pharmacology, creates hallucinogenic fear toxin",
        "Bane": "Superhuman strength (Venom-enhanced), tactical genius, master strategist, multiple language fluency",
        "Poison Ivy": "Chlorokinesis, toxin immunity, pheromone control, plant manipulation",
        "Mr. Freeze": "Cryogenic technology expert, genius-level intellect, armored cryo-suit, freeze ray",
        "Killer Croc": "Superhuman strength and durability, regenerative healing, razor-sharp claws and teeth, underwater breathing",
        "Ra's al Ghul": "Master swordsman, immortality via Lazarus Pit, tactical genius, vast resources and assassin network"
    };

    const threatAssessment = {
        "The Joker": "EXTREME - Unpredictable and extremely dangerous. Keep under constant surveillance.",
        "Harley Quinn": "HIGH - Volatile and unpredictable. High escape risk when motivated by Joker.",
        "Two-Face": "MEDIUM - Psychological instability. Monitor for escape attempts. Decisions unpredictable.",
        "The Riddler": "MEDIUM - Ego-driven. Compulsive need to leave clues limits spontaneous violence.",
        "Scarecrow": "HIGH - Fear toxin poses mass casualty risk. Maintain sedation protocols.",
        "Bane": "EXTREME - Without Venom still exceptionally dangerous. Maximum security required.",
        "Poison Ivy": "HIGH - Must prevent all contact with plant matter. Environmental hazard.",
        "Mr. Freeze": "HIGH - Technology breach could result in facility-wide cryogenic event.",
        "Killer Croc": "EXTREME - Savage and animalistic. Reinforced containment mandatory. Cannibalistic tendencies.",
        "Ra's al Ghul": "EXTREME - League of Assassins poses constant rescue threat. Highest security clearance required."
    };

    modalBody.innerHTML = `
        <div class="modal-prisoner-info">
            <h2>${prisoner.prisoner}</h2>
            
            <div class="detail-row">
                <strong>Legal Name:</strong> ${prisoner.alias}
            </div>
            
            <div class="detail-row">
                <strong>Cell Assignment:</strong> ${prisoner.cell_block}
            </div>
            
            <div class="detail-row">
                <strong>Security Classification:</strong> ${prisoner.security}
            </div>
            
            <div class="detail-row">
                <strong>Current Status:</strong> ${prisoner.status}
            </div>
            
            <div class="detail-row">
                <strong>Psychiatric Diagnosis:</strong> ${prisoner.diagnosis}
            </div>
            
            <div class="detail-row">
                <strong>Case File Reference:</strong> ${prisoner.dossier}
            </div>
            
            <div class="detail-row">
                <strong>Known Abilities & Skills:</strong><br>
                ${knownAbilities[prisoner.prisoner] || "Data unavailable"}
            </div>
            
            <div class="detail-row">
                <strong>Criminal History:</strong><br>
                ${criminalHistory[prisoner.prisoner] || "Record sealed or unavailable"}
            </div>
            
            <div class="detail-row">
                <strong>Threat Assessment:</strong><br>
                <span style="color: ${prisoner.security === 'Max' ? '#ff4444' : '#f39c12'}; font-weight: bold;">
                    ${threatAssessment[prisoner.prisoner] || "Assessment pending"}
                </span>
            </div>
            
            <div class="detail-row notes">
                <strong>Security Protocol Notes:</strong><br>
                ${prisoner.notes}
            </div>
            
            <div class="detail-row" style="border-left-color: #3498db; background: rgba(52, 152, 219, 0.1);">
                <strong>⚠️ Containment Status:</strong><br>
                Subject is currently detained in Arkham Asylum High Security Wing. Any breach must be reported immediately to GCPD.
            </div>
        </div>
    `;
    
    // Remove hidden class to show modal
    prisonerModal.classList.remove('hidden');
}

// Generate placeholder SVG if image fails to load
function generatePlaceholderSVG(name) {
    const initial = name.charAt(0);
    const colors = ['#8e44ad', '#e74c3c', '#3498db', '#2ecc71', '#f39c12'];
    const color = colors[name.charCodeAt(0) % colors.length];
    
    return `
        <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="200" fill="${color}"/>
            <text x="100" y="120" font-size="80" fill="white" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold">
                ${initial}
            </text>
        </svg>
    `;
}

// Initialize the page with static prisoner data
renderPrisoners();