*** Settings ***
Documentation     A Test That Test Create Function of Pet and Appointment as Owner
Library           SeleniumLibrary

*** Variables ***
${URL}    http://localhost:4200
${BROWSER}    Chrome
${USERNAME}    sandy
${PASSWORD}    password
${PETNAME}    Lucky
${PETBIRTHDATE}    2021/02/01
${APPOINTMENTDATE}    2029/01/01
${APPOINTMENTDESCRIPTION}    Periodical health check

*** Test Cases ***
Create Pet And Appointment As Owner
    [Setup]    Open Browser To Petclinic And Login As Owner
    Create Pet
    Make Appointment
    [Teardown]    Delete New Pet And Appointment And Close Browser

*** Keywords ***
Open Browser To Petclinic And Login As Owner
    Open Browser    ${URL}    ${BROWSER}
    Wait Until Page Contains Element    xpath=//form[contains(@id, 'signin')]
    Title Should Be    SpringPetclinicAngular
    Login As Owner    ${USERNAME}    ${PASSWORD}

Login As Owner
    [Arguments]     ${USERNAME}    ${PASSWORD}
    Input Text      xpath=//input[contains(@name, 'username')]    ${USERNAME}    
    Input Text      xpath=//input[contains(@name, 'password')]    ${PASSWORD}
    Click Button    xpath=//input[contains(@value, '2')]
    Click Button    xpath=//button[contains(text(), 'Login')]
    Wait Until Page Contains Element    xpath=//h2[contains(text(), 'Appointment')]
    Page Should Contain Element    xpath=//h2[contains(text(), 'Appointment')]

Create Pet
    Click Element    xpath=//li[contains(@id, 'Owners')]
    Wait Until Page Contains Element    xpath=//li[contains(@class, 'dropdown open')]
    Click Element    xpath=//a[contains(@ng-reflect-router-link, 'owners')]
    Wait Until Page Contains Element    xpath=//h1[contains(text(), 'Owner Information')]
    Sleep    3
    Click Element     xpath=//button[contains(text(), 'Add New Pet')]
    Wait Until Page Contains Element    xpath=//h2[contains(text(), 'Add Pet')]
    Input Text    xpath=//input[@name='name']    ${PETNAME}
    Input Text    xpath=//input[contains(@name, 'birthDate')]    ${PETBIRTHDATE}
    Click Element    xpath=//select[contains(@name, 'type')]
    Click Element    xpath=//option[contains(@value, '0')]
    Click Button    xpath=//button[contains(text(), 'Save Pet')]
    Wait Until Page Contains Element    xpath=//h1[contains(text(), 'Owner Information')]

Make Appointment
    Wait Until Page Contains Element    xpath=//button[contains(text(), 'Make Appointment')]
    Click Button    xpath=//button[contains(text(), 'Make Appointment')]
    Wait Until Page Contains Element    xpath=//h2[contains(text(), 'New Visit')]
    Input Text    xpath=//input[contains(@name, 'date')]    ${APPOINTMENTDATE}
    Input Text    xpath=//input[contains(@name, 'description')]    ${APPOINTMENTDESCRIPTION}
    Click Button    xpath=//button[contains(text(), 'Make Appointment')]
    Wait Until Page Contains Element    xpath=//h1[contains(text(), 'Owner Information')]

Delete New Pet And Appointment And Close Browser
    Wait Until Page Contains Element    xpath=//button[contains(text(), 'Delete Pet')]
    Click Button    xpath=//button[contains(text(), 'Delete Pet')]
    Close Browser














