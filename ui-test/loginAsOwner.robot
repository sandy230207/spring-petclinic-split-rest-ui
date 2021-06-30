*** Settings ***
Documentation     A Test That Test Login Function of Petclinic as Owner
Library           SeleniumLibrary

*** Variables ***
${URL}    http://localhost:4200
${BROWSER}    Chrome
${USERNAME}    sandy
${PASSWORD}    password

*** Test Cases ***
Login As Owner
    [Setup]    Open Browser To Petclinic
    Login As Owner    ${USERNAME}    ${PASSWORD}
    Page Should Contain Element    xpath=//h2[contains(text(), 'Appointment')]
    [Teardown]    Close Browser


*** Keywords ***
Open Browser To Petclinic
    Open Browser    ${URL}    ${BROWSER}
    Wait Until Page Contains Element    xpath=//form[contains(@id, 'signin')]
    Title Should Be    SpringPetclinicAngular

Login As Owner
    [Arguments]     ${USERNAME}    ${PASSWORD}
    Input Text      xpath=//input[contains(@name, 'username')]    ${USERNAME}    
    Input Text      xpath=//input[contains(@name, 'password')]    ${PASSWORD}
    Click Button    xpath=//input[contains(@value, '2')]
    Click Button    xpath=//button[contains(text(), 'Login')]
    Wait Until Page Contains Element    xpath=//h2[contains(text(), 'Appointment')]
