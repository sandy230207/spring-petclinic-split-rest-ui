*** Settings ***
Documentation     A Test That Test Create Function of Vet as Vet
Library           SeleniumLibrary

*** Variables ***
${HOMEURL}    ${URL}:8080
${BROWSER}    Chrome
${USERNAME}    daisy
${PASSWORD}    000000
${VETFIRSTNAME}    家瑜
${VETLASTNAME}    歐陽


*** Test Cases ***
Create Vet As Vet
    [Setup]    Open Browser To Petclinic And Login As Vet
        Create Vet
    [Teardown]    Delete New Vet And Close Browser

*** Keywords ***
Open Browser To Petclinic And Login As Vet
    ${chrome_options} =     Evaluate    sys.modules['selenium.webdriver'].ChromeOptions()    sys, selenium.webdriver
    Call Method     ${chrome_options}   add_argument    --headless
    Create WebDriver    ${BROWSER}    chrome_options=${chrome_options}
    Set Window Size    ${1920}    ${1080}
    Go To    ${HOMEURL}
    Wait Until Page Contains Element    xpath=//form[contains(@id, 'signin')]
    Title Should Be    SpringPetclinicAngular
    Login As Vet    ${USERNAME}    ${PASSWORD}

Login As Vet
    [Arguments]     ${USERNAME}    ${PASSWORD}
    Input Text      xpath=//input[contains(@name, 'username')]    ${USERNAME}    
    Input Text      xpath=//input[contains(@name, 'password')]    ${PASSWORD}
    Click Button    xpath=//input[contains(@value, '1')]
    Click Button    xpath=//button[contains(text(), 'Login')]
    Wait Until Page Contains Element    xpath=//h1[contains(text(), 'Welcome to Petclinic')]    timeout=10

Create Vet
    Click Element    xpath=//a[contains(text(), 'Veterinarians')]
    Wait Until Page Contains Element    xpath=//li[contains(@class, 'dropdown open')]
    Click Element    xpath=//a[contains(@routerlink, 'vets')]
    Wait Until Page Contains Element    xpath=//button[contains(text(), 'Add Vet')]
    Click Button    xpath=//button[contains(text(), 'Add Vet')]
    Wait Until Page Contains Element    xpath=//h2[contains(text(), 'New Veterinarian')]
    Input Text    xpath=//input[contains(@name, 'firstName')]    ${VETFIRSTNAME}
    Input Text    xpath=//input[contains(@name, 'lastName')]    ${VETLASTNAME}
    Click Element     xpath=//select[contains(@name, 'specialties')]
    Wait Until Page Contains Element    xpath=//option[contains(@value, '0')]
    Click Element    xpath=//option[contains(@value, '0')]
    Click Button    xpath=//button[contains(text(), 'Save Vet')]
    Wait Until Page Contains Element    xpath=//h2[contains(text(), 'Veterinarians')]

Delete New Vet And Close Browser
    Wait Until Page Contains Element    xpath=//td[contains(text(), '${VETFIRSTNAME}') and contains(text(), '${VETLASTNAME}')]
    Click Element    xpath=//td[contains(text(), '${VETFIRSTNAME}') and contains(text(), '${VETLASTNAME}')]//following-sibling::td[2]//descendant::div[1]//descendant::button[contains(text(), 'Delete Vet')]
    Sleep    3
    Close Browser