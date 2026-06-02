// ============================================
// PAGE NAVIGATION
// ============================================

const pages = document.querySelectorAll(".page")
const nav = document.querySelectorAll(".nav-links a")

function showPage(pageId) {
    pages.forEach(function(page) {
        page.style.display = "none"
    })
    nav.forEach(function(link) {
        link.classList.remove("active")
    })
    document.getElementById(pageId).style.display = "block"
    document.querySelector('.nav-links a[href="#' + pageId + '"]').classList.add("active")
}

nav.forEach(function(link) {
    link.addEventListener("click", function(e) {
        e.preventDefault()
        const pageId = link.getAttribute("href").replace("#", "")
        showPage(pageId)
    })
})

showPage("home")


// ============================================
// PASSWORD PROTECTION
// ============================================

const passwordBtn = document.getElementById("password-btn")
const passwordInput = document.getElementById("password-input")
const passwordMsg = document.getElementById("password-msg")
const passwordScreen = document.getElementById("password-screen")
const leaderContent = document.getElementById("leader-content")
const correctPassword = "1"

passwordBtn.addEventListener("click", function() {
    const entered = passwordInput.value

    if (entered === correctPassword) {
        passwordScreen.style.display = "none"
        leaderContent.style.display = "block"
    } else {
        passwordMsg.style.color = "#e8385a"
        passwordMsg.textContent = "Wrong password! Try again."
        passwordInput.value = ""
    }
})


// ============================================
// HOME PAGE — ANNOUNCEMENT
// ============================================

const announcement = document.getElementById("message")
const announcementInput = document.getElementById("announcement-input")
const announcementBtn = document.getElementById("announcement-btn")
const announcementMsg = document.getElementById("announcement-msg")

announcementBtn.addEventListener("click", function() {
    const message = announcementInput.value

    if (message === "") {
        announcementMsg.style.color = "#e8385a"
        announcementMsg.textContent = "Write an announcement first!"
    } else {
        announcement.textContent = message
        announcementInput.value = ""
        announcementMsg.style.color = "#22c55e"
        announcementMsg.textContent = "Successfully Announced!"
    }
})


// ============================================
// RC CAR PAGE — UPDATE NAME & DESCRIPTION
// ============================================

const rccarname = document.getElementById("rccarname")
const rccarnameInput = document.getElementById("rccarname-input")
const rccarnameBtn = document.getElementById("rccarname-btn")
const rccarnameMsg = document.getElementById("rccarname-msg")

rccarnameBtn.addEventListener("click", function() {
    const rccarnameValue = rccarnameInput.value

    if (rccarnameValue === "") {
        rccarnameMsg.style.color = "#e8385a"
        rccarnameMsg.textContent = "Write an RC Car name first!"
    } else {
        rccarname.textContent = rccarnameValue
        rccarnameInput.value = ""
        rccarnameMsg.style.color = "#22c55e"
        rccarnameMsg.textContent = "RC Car name updated successfully!"
    }
})

const description = document.getElementById("description")
const descriptionInput = document.getElementById("rc-description-input")
const descriptionBtn = document.getElementById("description-btn")
const descriptionMsg = document.getElementById("description-msg")

descriptionBtn.addEventListener("click", function() {
    const descriptionValue = descriptionInput.value

    if (descriptionValue === "") {
        descriptionMsg.style.color = "#e8385a"
        descriptionMsg.textContent = "Write a description first!"
    } else {
        description.textContent = descriptionValue
        descriptionInput.value = ""
        descriptionMsg.style.color = "#22c55e"
        descriptionMsg.textContent = "Description added successfully!"
    }
})


// ============================================
// UPGRADES PAGE — ADD UPGRADE & MARK INSTALLED
// ============================================

const upgradeInput = document.getElementById("upgrade-input")
const upgradeCost = document.getElementById("upgradecost-input")
const upgradeBtn = document.getElementById("upgrade-btn")
const upgradeMsg = document.getElementById("upgrade-msg")

upgradeBtn.addEventListener("click", function() {
    const upgradeValue = upgradeInput.value
    const upgradecostValue = upgradeCost.value

    if (upgradeValue === "" && upgradecostValue === "") {
        upgradeMsg.style.color = "#e8385a"
        upgradeMsg.textContent = "Enter a component and its cost first!"
    } else if (upgradeValue === "") {
        upgradeMsg.style.color = "#e8385a"
        upgradeMsg.textContent = "Enter a component first!"
    } else if (upgradecostValue === "") {
        upgradeMsg.style.color = "#e8385a"
        upgradeMsg.textContent = "Enter component cost first!"
    } else {
        const newCard = document.createElement("div")
        newCard.classList.add("planned-card")
        newCard.innerHTML = `
            <span class="tag">PLANNED</span>
            <h4>${upgradeValue}</h4>
            <p>₱${upgradecostValue}</p>
        `
        document.querySelector(".planned").appendChild(newCard)
        upgradeInput.value = ""
        upgradeCost.value = ""
        upgradeMsg.style.color = "#22c55e"
        upgradeMsg.textContent = "Upgrade added successfully!"
    }
})

const markInstalledBtn = document.getElementById("mark-installed-btn")
const componentSelect = document.getElementById("component-select")
const installedMsg = document.getElementById("installed-msg")

markInstalledBtn.addEventListener("click", function() {
    const selectedComponent = componentSelect.value

    if (selectedComponent === "") {
        installedMsg.style.color = "#e8385a"
        installedMsg.textContent = "Please select a component first!"
        return
    }

    installedMsg.style.color = "#22c55e"
    installedMsg.textContent = "✓ " + selectedComponent + " marked as installed!"
    componentSelect.value = ""
})


// ============================================
// FUND PAGE — MARK MEMBER AS PAID
// ============================================

const markPaidBtn = document.getElementById("mark-paid-btn")
const memberSelect = document.getElementById("member-select")
const leaderMsg = document.getElementById("leader-msg")

markPaidBtn.addEventListener("click", function() {
    const selectedMember = memberSelect.value

    if (selectedMember === "") {
        leaderMsg.style.color = "#e8385a"
        leaderMsg.textContent = "Please select a member first!"
        return
    }

    leaderMsg.style.color = "#22c55e"
    leaderMsg.textContent = "✓ " + selectedMember + " marked as paid!"
    memberSelect.value = ""
})


// ============================================
// MEMBERS PAGE — ADD MEMBER
// ============================================

const addMemberInput = document.getElementById("addmember-input")
const addMemberBtn = document.getElementById("addmember-btn")
const addMemberMsg = document.getElementById("addmember-msg")
const addMemberPosition = document.getElementById("position-select")

addMemberBtn.addEventListener("click", function() {
    const addMemberValue = addMemberInput.value
    const addMemberPositionValue = addMemberPosition.value

    if (addMemberValue === "" && addMemberPositionValue === "") {
        addMemberMsg.style.color = "#e8385a"
        addMemberMsg.textContent = "Enter Member's Full Name & Position first!"
    } else if (addMemberValue === "") {
        addMemberMsg.style.color = "#e8385a"
        addMemberMsg.textContent = "Enter Member's Full Name first!"
    } else if (addMemberPositionValue === "") {
        addMemberMsg.style.color = "#e8385a"
        addMemberMsg.textContent = "Enter Member's Position first!"
    } else {
        const newCard = document.createElement("div")
        newCard.classList.add("member-card")
        newCard.innerHTML = `
            <h3>${addMemberValue}</h3>
            <p>${addMemberPositionValue}</p>
            <p>₱0</p>
        `
        document.querySelector(".members-grid").appendChild(newCard)
        addMemberInput.value = ""
        addMemberMsg.style.color = "#22c55e"
        addMemberMsg.textContent = "Member added successfully!"
    }
})