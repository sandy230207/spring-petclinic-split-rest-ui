*** Settings ***
Documentation     A Test That Test Create User Function
Library           SeleniumLibrary
Library           RequestsLibrary

*** Variables ***
${HOMEURL}    ${URL}:8080
${BROWSER}    Chrome
${USERNAME}    kristin
${PASSWORD}    password
${FIRSTNAME}   Kristin
${LASTNAME}    Wu
${ADDRESS}    No.48, Lane 187, Chiung Lin S. Rd.
${CITY}    Taipei
${TELEPHONE}    0948998494    

${DELETEUSERURL}    ${URL}:9966/petclinic/api/users/kristin


*** Test Cases ***
Create Owner User
    [Setup]    Open Browser To Petclinic And Go To Create User Page
    Create Owner User
    Page Should Contain Element    xpath=//form[contains(@id, 'signin')]
    Login As Owner    ${USERNAME}    ${PASSWORD}
    Page Should Contain Element    xpath=//h1[contains(text(), 'Welcome to Petclinic')]
    [Teardown]    Close Browser And Delete Testing User


*** Keywords ***
Open Browser To Petclinic And Go To Create User Page
    ${chrome_options} =     Evaluate    sys.modules['selenium.webdriver'].ChromeOptions()    sys, selenium.webdriver
    Call Method     ${chrome_options}   add_argument    --headless
    Create WebDriver    ${BROWSER}    chrome_options=${chrome_options}
    Set Window Size    ${1920}    ${1080}
    Go To    ${HOMEURL}
    Wait Until Page Contains Element    xpath=//form[contains(@id, 'signin')]
    Title Should Be    SpringPetclinicAngular
    Click Button    xpath=//button[contains(text(), 'Go To Sign Up Page')]

Create Owner User
    Input Text    xpath=//input[contains(@id, 'username')]    ${USERNAME}
    Input Text    xpath=//input[contains(@id, 'password')]    ${PASSWORD}
    Input Text    xpath=//input[contains(@id, 'firstName')]    ${FIRSTNAME}
    Input Text    xpath=//input[contains(@id, 'lastName')]    ${LASTNAME}
    Input Text    xpath=//input[contains(@id, 'address')]    ${ADDRESS}
    Input Text    xpath=//input[contains(@id, 'city')]    ${CITY}
    Input Text    xpath=//input[contains(@id, 'telephone')]    ${TELEPHONE}
    Click Button    xpath=//button[contains(text(), 'Register')]
    Wait Until Page Contains Element    xpath=//form[contains(@id, 'signin')]    timeout=10

Close Browser And Delete Testing User
    Close Browser
    Delete    ${DELETEUSERURL}    204

Login As Owner
    [Arguments]     ${USERNAME}    ${PASSWORD}
    Input Text      xpath=//input[contains(@name, 'username')]    ${USERNAME}    
    Input Text      xpath=//input[contains(@name, 'password')]    ${PASSWORD}
    Click Button    xpath=//input[contains(@value, '2')]
    Click Button    xpath=//button[contains(text(), 'Login')]
    Wait Until Page Contains Element    xpath=//h1[contains(text(), 'Welcome to Petclinic')]    timeout=10