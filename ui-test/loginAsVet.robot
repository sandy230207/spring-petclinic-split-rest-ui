*** Settings ***
Documentation     A Test That Test Login Function of Petclinic as Vet
Library           SeleniumLibrary

*** Variables ***
${HOMEURL}    ${URL}:8080
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
    ${chrome_options} =     Evaluate    sys.modules['selenium.webdriver'].ChromeOptions()    sys, selenium.webdriver
    Call Method     ${chrome_options}   add_argument    --headless
    Create WebDriver    ${BROWSER}    chrome_options=${chrome_options}
    Set Window Size    ${1920}    ${1080}
    Go To    ${HOMEURL}
    Wait Until Page Contains Element    xpath=//form[contains(@id, 'signin')]
    Title Should Be    SpringPetclinicAngular

Login As Vet
    [Arguments]     ${USERNAME}    ${PASSWORD}
    Input Text      xpath=//input[contains(@name, 'username')]    ${USERNAME}    
    Input Text      xpath=//input[contains(@name, 'password')]    ${PASSWORD}
    Click Button    xpath=//input[contains(@value, '1')]
    Click Button    xpath=//button[contains(text(), 'Login')]
    Wait Until Page Contains Element    xpath=//h1[contains(text(), 'Welcome to Petclinic')]    timeout=10
