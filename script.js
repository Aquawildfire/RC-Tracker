// ============================================
// Local Storage Functions
// ============================================


// Announcement

function saveAnnouncement(){
    localStorage.setItem("announcement", announcement.textContent)
}

function loadAnnouncement() {
    const announcementSaved = localStorage.getItem("announcement")

    if(announcementSaved) {
        announcement.textContent = announcementSaved
    }
}

// RC description && Rc name

function saveRcDescription() {
    localStorage.setItem("RcDescription", description.textContent)
}

function loadRcDescription() {
    const rcDescriptionSaved = localStorage.getItem("RcDescription")

    if(rcDescriptionSaved) {
        description.textContent = rcDescriptionSaved
    }
}

function saveRcName() {
    localStorage.setItem("RcName", rccarname.textContent)
}

function loadRcName() {
    const rcCarNameSaved = localStorage.getItem("RcName")

    if(rcCarNameSaved) {
        rccarname.textContent = rcCarNameSaved
    }
}

// Components

function saveUpgrades() {
    const saveUpgrades = document.querySelectorAll(".planned-card")
    const upgrades = []

    saveUpgrades.forEach(function(upgrade) {
        const componentName = upgrade.querySelector(".component-name")
        const componentCost = upgrade.querySelector(".component-cost").textContent.replace("₱", "").replace(",", "")

        const component = { name: componentName.textContent, cost: componentCost }
        upgrades.push(component)
    })
    localStorage.setItem("savedUpgrades", JSON.stringify(upgrades))
}

function loadUpgrades() {
    const upgradesSaved = localStorage.getItem("savedUpgrades")

    if(upgradesSaved) {
        const upgradeList = JSON.parse(upgradesSaved)
        
        document.getElementById("component-select").innerHTML = '<option value="">Select a component...</option>'
        document.getElementById("remove-component-select").innerHTML = '<option value="">Select a component...</option>'
        document.querySelector(".planned").innerHTML = ''

        upgradeList.forEach(function(upgrade) {
            const newCard = document.createElement("div")
            newCard.classList.add("planned-card")
            newCard.innerHTML = `
                <span class="tag">PLANNED</span>
                <h4 class="component-name">${upgrade.name}</h4>
                <p class="component-cost">₱${upgrade.cost}</p>
            `
            document.querySelector(".planned").appendChild(newCard)

            const removeOption = document.createElement("option")
            removeOption.value = upgrade.name
            removeOption.textContent = upgrade.name
            document.getElementById("remove-component-select").appendChild(removeOption)

            const installedOption = document.createElement("option")
            installedOption.value = upgrade.name
            installedOption.textContent = upgrade.name
            document.getElementById("component-select").appendChild(installedOption)
        })

    }

}

function saveInstalledUpgrades() {
    const saveInstalled = document.querySelectorAll(".installed-card")
    const installed = []

    saveInstalled.forEach(function(upgrade) {
        const componentName = upgrade.querySelector("h4")
        const componentCost = upgrade.querySelector("p").textContent.replace("₱", "").replace(",", "")

        const component = { name: componentName.textContent, cost: componentCost }
        installed.push(component)
    })
    localStorage.setItem("savedInstalledUpgrades", JSON.stringify(installed))
}

function loadInstalledUpgrades() {
    const installedSaved = localStorage.getItem("savedInstalledUpgrades")

    if(installedSaved) {
        const installedList = JSON.parse(installedSaved)
        document.querySelector(".installed").innerHTML = ''

        installedList.forEach(function(upgrade) {
            const newCard = document.createElement("div")
            newCard.classList.add("installed-card")
            newCard.innerHTML = `
                <span class="tag">INSTALLED</span>
                <h4>${upgrade.name}</h4>
                <p>₱${upgrade.cost}</p>
            `

            document.querySelector(".installed").appendChild(newCard)
        })
    }
}


// Members

function saveMembers() {
    const members = document.querySelectorAll("tbody tr")
    const positions = document.querySelectorAll(".member-card")
    const membersStats = []

    members.forEach(function(member) {
        positions.forEach(function(position) {

            if(member.cells[0].textContent.trim() == position.querySelector("h3").textContent) {
                const memberName = member.cells[0].textContent.trim()
                const daysPaid = member.querySelector(".days-paid").textContent
                const badge = member.querySelector(".badge").textContent
                const pos = position.querySelector("p").textContent

                const memberStat = { name: memberName, days: daysPaid, status: badge, position: pos}
                membersStats.push(memberStat)
            }
        })
        
    })

    localStorage.setItem("membersStat", JSON.stringify(membersStats))
    
}

function loadMembers() {
    const savedMemberStats = localStorage.getItem("membersStat")

    if(savedMemberStats) {
        const membersList = JSON.parse(savedMemberStats)
        document.querySelector("tbody").innerHTML = ''
        document.querySelector(".members-grid").innerHTML = ''
        document.getElementById("member-select").innerHTML = '<option value="">Select a member...</option>'
        document.getElementById("remove-member-select").innerHTML = `<option value="">Select a member...</option>`

        membersList.forEach(function(member) {
            const memberFundStat = document.createElement("tr")
            const status = member.status
            memberFundStat.innerHTML = `
                <td value="${member.name}">${member.name}</td>
                <td class="days-paid">${member.days}</td>
                <td class="total-paid">₱${member.days * 5}</td>
                <td><span class="badge ${status.toLowerCase()}">${status}</span></td>
            `

            const memberCardStat = document.createElement("div")
            memberCardStat.classList.add("member-card")
            memberCardStat.innerHTML = `
                <h3>${member.name}</h3>
                <p>${member.position}</p>
                <p>₱${member.days * 5}</p>
            `

            const memberDropDown = document.createElement("option")
            memberDropDown.value = member.name
            memberDropDown.textContent = member.name

            const removeOption = document.createElement("option")
            removeOption.value = member.name
            removeOption.textContent = member.name

            document.getElementById("remove-member-select").appendChild(removeOption)
            document.getElementById("member-select").appendChild(memberDropDown)
            document.querySelector("tbody").appendChild(memberFundStat)
            document.querySelector(".members-grid").appendChild(memberCardStat)
            
        })

    }


}


// Log Activity

function saveLog(logId, storageKey) {
    const log = document.getElementById(logId)
    const logArr = []
    const activityLog = log.querySelectorAll(".log-entry")

    activityLog.forEach(entry => {
        const paymentLog = { log: entry.innerHTML }
        logArr.push(paymentLog)
    })

    localStorage.setItem(storageKey, JSON.stringify(logArr))
    
}


function loadLog(logId, storageKey) {
    const savedLogs = localStorage.getItem(storageKey)
    
    if(savedLogs) {
        document.getElementById(logId).innerHTML = ''
        const parsedLogs = JSON.parse(savedLogs)

        parsedLogs.forEach(function(logs) {
            const logCard = document.createElement("p")
            logCard.classList.add("log-entry")
            logCard.innerHTML = logs.log

            document.getElementById(logId).appendChild(logCard)
        })
    }
    

}

loadLog("upgrades-log", "upgradesLog")
loadLog("payment-log", "paymentsLog")
// ============================================
// ACTIVITY LOG
// ============================================

// Adds one entry to the top of an activity log (payment-log or upgrades-log)
function addLogEntry(logId, text) {
    const log = document.getElementById(logId)

    const entry = document.createElement("p")
    entry.classList.add("log-entry")

    const now = new Date()
    const timeStamp = now.toLocaleDateString() + " " + now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    entry.innerHTML = `${text} <span class="log-time">${timeStamp}</span>`

    log.prepend(entry)
}

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
loadAnnouncement()

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
        saveAnnouncement()
    }
})


// ============================================
// RC CAR PAGE — UPDATE NAME & DESCRIPTION
// ============================================

const rccarname = document.getElementById("rccarname")
const rccarnameInput = document.getElementById("rccarname-input")
const rccarnameBtn = document.getElementById("rccarname-btn")
const rccarnameMsg = document.getElementById("rccarname-msg")
loadRcName()

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
        saveRcName()
    }
})

const description = document.getElementById("description")
const descriptionInput = document.getElementById("rc-description-input")
const descriptionBtn = document.getElementById("description-btn")
const descriptionMsg = document.getElementById("description-msg")
loadRcDescription()

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
        saveRcDescription()
    }
})


// ============================================
// UPGRADES PAGE — ADD UPGRADE, & MARK INSTALLED
// ============================================

const upgradeInput = document.getElementById("upgrade-input")
const upgradeCost = document.getElementById("upgradecost-input")
const upgradeBtn = document.getElementById("upgrade-btn")
const upgradeMsg = document.getElementById("upgrade-msg")
loadUpgrades()
loadInstalledUpgrades()

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
            <h4 class="component-name">${upgradeValue}</h4>
            <p class="component-cost">₱${upgradecostValue}</p>
        `

        const newUpgrade = document.createElement("option")
        newUpgrade.value = upgradeValue
        newUpgrade.textContent = upgradeValue

        const newRemoveOption = document.createElement("option")
        newRemoveOption.value = upgradeValue
        newRemoveOption.textContent = upgradeValue

        document.getElementById("component-select").appendChild(newUpgrade)
        document.getElementById("remove-component-select").appendChild(newRemoveOption)
        document.querySelector(".planned").appendChild(newCard)
        upgradeInput.value = ""
        upgradeCost.value = ""
        upgradeMsg.style.color = "#22c55e"
        upgradeMsg.textContent = "Upgrade added successfully!"
        addLogEntry("upgrades-log", `➕ Added "${upgradeValue}" (₱${upgradecostValue}) to planned upgrades`)
        saveLog("upgrades-log", "upgradesLog")
        updateTotals()
        saveUpgrades()
    } 
})

const markInstalledBtn = document.getElementById("mark-installed-btn")
const componentSelect = document.getElementById("component-select")
const installedMsg = document.getElementById("installed-msg")

markInstalledBtn.addEventListener("click", function() {
    const selectedComponent = componentSelect.value
    const planned = document.querySelectorAll(".planned-card")

    if (selectedComponent === "") {
        installedMsg.style.color = "#e8385a"
        installedMsg.textContent = "Please select a component first!"
    } else {

        planned.forEach(function(plannedComponent) {

            const componentName = document.querySelectorAll(".component-name")

            componentName.forEach(function(name)  {

                if (name.textContent === selectedComponent) {
                    const componentCost = name.parentElement.querySelector(".component-cost")

                    const newInstalled = document.createElement("div")
                    newInstalled.classList.add("installed-card")
                    newInstalled.innerHTML =  `
                            <span class="tag">INSTALLED</span>
                            <h4>${name.textContent}</h4>
                            <p>${componentCost.textContent}</p>
                        `

                    document.querySelector(".installed").appendChild(newInstalled)
                    name.parentElement.remove()
                    componentSelect.querySelector(`option[value="${selectedComponent}"]`).remove()

                    const removeSelectOption = document.getElementById("remove-component-select").querySelector(`option[value="${selectedComponent}"]`)
                    if (removeSelectOption) {
                        removeSelectOption.remove()
                    }

                } else {
                     return
                }
                
            })

        })
                installedMsg.style.color = "#22c55e"
                installedMsg.textContent = "✓ " + selectedComponent + " marked as installed!"
                addLogEntry("upgrades-log", `✓ Marked "${selectedComponent}" as installed`)
                saveLog("upgrades-log", "upgradesLog")
                componentSelect.value = ""
                updateTotals()
                saveUpgrades()
                saveInstalledUpgrades()
                loadInstalledUpgrades()
    }
})

// ============================================
// UPGRADES PAGE — REMOVE UPGRADE
// ============================================

const removeBtn = document.getElementById("remove-btn")
const removeComponentSelect = document.getElementById("remove-component-select")
const removedMsg = document.getElementById("removed-msg")

removeBtn.addEventListener("click", function() {
    const selectedComponent = removeComponentSelect.value

    if (selectedComponent === "") {
        removedMsg.style.color = "#e8385a"
        removedMsg.textContent = "Please select a component first!"
        return
    }

    const componentNames = document.querySelectorAll(".component-name")

    componentNames.forEach(function(name) {
        if (name.textContent === selectedComponent) {
            name.parentElement.remove()
        }
    })

    const markInstalledOption = componentSelect.querySelector(`option[value="${selectedComponent}"]`)
    if (markInstalledOption) {
        markInstalledOption.remove()
    }

    removeComponentSelect.querySelector(`option[value="${selectedComponent}"]`).remove()

    removedMsg.style.color = "#22c55e"
    removedMsg.textContent = "🗑 " + selectedComponent + " removed successfully!"
    addLogEntry("upgrades-log", `🗑 Removed "${selectedComponent}" from planned upgrades`)
    saveLog("upgrades-log", "upgradesLog")
    removeComponentSelect.value = ""
    updateTotals()
    saveUpgrades()
})

// ============================================
// FUND PAGE — MARK MEMBER AS PAID
// ============================================

const markPaidBtn = document.getElementById("mark-paid-btn")
const memberSelect = document.getElementById("member-select")
const leaderMsg = document.getElementById("leader-msg")

const totalGoalEls = document.querySelectorAll(".total-goal")
const totalCollectedEls = document.querySelectorAll(".total-collected")
const remainingGoalEls = document.querySelectorAll(".remaining-goal")
loadMembers()

const dailyFund = 5

let totalGoal = 0
let totalCollected = 0

// Function to update all totals
function updateTotals() {

    // Function to update total paid
    let totalPaid = 0
    let totalMember = 0
    document.querySelectorAll("tbody tr").forEach(row => {
    totalMember += 1
    const badge = row.querySelector(".badge")

    if(badge && badge.textContent === "Paid") {
        totalPaid += 1
    }
    })

    document.querySelector(".members-paid").textContent = totalPaid + "/" + totalMember

    // Reset values before recalculating
    totalGoal = 0
    totalCollected = 0

    // Add all component costs
    document.querySelectorAll(".component-cost").forEach(costEl => {
        totalGoal += parseInt(
            costEl.textContent.replace("₱", "").replace(",", "")
        ) || 0
    })

    document.querySelectorAll(".total-paid").forEach(paid => {
        totalCollected += parseInt(
            paid.textContent.replace("₱", "").replace(",", "")
        ) || 0
    })

    const remainingGoal = totalGoal - totalCollected
    const progressPercent = Math.round((totalCollected / totalGoal) * 100)
    document.querySelector(".progress-percent").textContent = progressPercent + "%"
    document.querySelector(".progress-fill").style = "width: " + progressPercent + "%"


    // Update all matching elements
    totalGoalEls.forEach(el => {
        el.textContent = `₱${totalGoal.toLocaleString()}`
    })

    totalCollectedEls.forEach(el => {
        el.textContent = `₱${totalCollected.toLocaleString()}`
    })

    remainingGoalEls.forEach(el => {
        el.textContent = `₱${remainingGoal.toLocaleString()}`
    })
    
    saveMembers()
}

// Run once when page loads
updateTotals()


// Mark member as paid
markPaidBtn.addEventListener("click", function () {

    const selectedMember = memberSelect.value

    if (!selectedMember) {
        leaderMsg.style.color = "#e8385a"
        leaderMsg.textContent = "Please select a member first!"
        return
    }

    let found = false

    document.querySelectorAll("tbody tr").forEach(row => {

        if (row.cells[0].textContent.trim() === selectedMember) {

            found = true

            const badge = row.querySelector(".badge")
            const totalPaid = parseInt(
                row.querySelector(".total-paid").textContent.replace("₱", "").replace(",", "")
            )|| 0
            const daysPaid = parseInt(
                row.querySelector(".days-paid").textContent.replace("₱", "").replace(",", "")
            )

            if (badge.textContent.trim() !== "Paid") {

                badge.classList.remove("unpaid")
                badge.classList.add("paid")
                badge.textContent = "Paid"
                row.querySelector(".total-paid").textContent = `₱${(totalPaid + dailyFund)}`
                row.querySelector(".days-paid").textContent = `${(daysPaid + 1)}`
                updateTotals()

                leaderMsg.style.color = "#22c55e"
                leaderMsg.textContent =
                    `✓ ${selectedMember} marked as paid!`
                addLogEntry("payment-log", `✓ ${selectedMember} paid ₱${dailyFund}`)
                saveLog("payment-log", "paymentsLog")

            } else {

                leaderMsg.style.color = "#e8385a"
                leaderMsg.textContent =
                    `${selectedMember} already marked as paid!`
            }

            memberSelect.value = ""
        }
    })

    if (!found) {
        leaderMsg.style.color = "#e8385a"
        leaderMsg.textContent = "Member not found!"
    }
})

// ============================================
// MEMBERS PAGE — ADD MEMBER & REMOVE MEMBER
// ============================================

const addMemberInput = document.getElementById("addmember-input")
const addMemberBtn = document.getElementById("addmember-btn")
const addMemberMsg = document.getElementById("addmember-msg")
const addMemberPosition = document.getElementById("position-select")
loadMembers()

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

        const newMemberSelect = document.createElement("option")
        newMemberSelect.value = addMemberValue
        newMemberSelect.textContent = addMemberValue

        const newMemberPayments = document.createElement("tr")
        newMemberPayments.innerHTML = `
            <td id="member-name">${addMemberValue}</td>
            <td class="days-paid">0</td>
            <td class="total-paid">₱0</td>
            <td><span class="badge unpaid">Unpaid</span></td>
        `

        document.querySelector("tbody").appendChild(newMemberPayments)
        document.getElementById("member-select").appendChild(newMemberSelect)
        document.querySelector(".members-grid").appendChild(newCard)
        addMemberInput.value = ""
        addMemberPosition.value = ""
        addMemberMsg.style.color = "#22c55e"
        addMemberMsg.textContent = "Member added successfully!"
        saveMembers()
        loadMembers()
        updateTotals()
    }
})

const removeMemberSelect = document.getElementById("remove-member-select")
const removeMemberBtn = document.getElementById("remove-member-btn")
const removeMemberMsg = document.getElementById("remove-member-msg")

removeMemberBtn.addEventListener("click", function() {
    const removeMemberValue = removeMemberSelect.value
    const memberCard = document.querySelectorAll(".member-card")

    if(removeMemberValue === "") {
        removeMemberMsg.style.color = "#e8385a"
        removeMemberMsg.textContent = "Please Select a component first"
        return
    }

    document.querySelectorAll("tbody tr").forEach(row => {
        
        if (row.cells[0].textContent.trim() === removeMemberValue) {
                row.remove()
                
                removeMemberMsg.style.color = "#22c55e"
                removeMemberMsg.textContent = "🗑 Member Removed Succesfully"
                removeMemberSelect.value = ""
                saveMembers()
                loadMembers()
                updateTotals()
            }
    })

})