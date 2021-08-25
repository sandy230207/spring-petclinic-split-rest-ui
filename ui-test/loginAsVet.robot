*** Settings ***
Documentation     A Test That Test Login Function of Petclinic as Vet
Library           SeleniumLibrary

*** Variables ***
${URL}    http://localhost:8080
${BROWSER}    Chrome
${USERNAME}    daisy
${PASSWORD}    000000

*** Test Cases ***
Login As Vet 
    [Setup]    Open Browser To Petclinic
    Login As Vet    ${USERNAME}    ${PASSWORD}
    Page Should Contain Element    xpath=//h1[contains(text(), 'Welcome to Petclinic')]
    [Teardown]    Close Browser


*** Keywords ***
Open Browser To Petclinic
    Open Browser    ${URL}    ${BROWSER}
    Wait Until Page Contains Element    xpath=//form[contains(@id, 'signin')]
    Title Should Be    SpringPetclinicAngular

Login As Vet
    [Arguments]     ${USERNAME}    ${PASSWORD}
    Input Text      xpath=//input[contains(@name, 'username')]    ${USERNAME}    
    Input Text      xpath=//input[contains(@name, 'password')]    ${PASSWORD}
    Click Button    xpath=//input[contains(@value, '1')]
    Click Button    xpath=//button[contains(text(), 'Login')]
    Wait Until Page Contains Element    xpath=//h1[contains(text(), 'Welcome to Petclinic')]
