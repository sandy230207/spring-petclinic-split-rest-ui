*** Settings ***
Documentation     A Test That Test Login Function of Petclinic as Owner
Library           SeleniumLibrary

*** Variables ***
${HOMEURL}    ${URL}:8080
${BROWSER}    Chrome
${USERNAME}    sandy
${PASSWORD}    password

*** Test Cases ***
Login As Owner
    [Setup]    Open Browser To Petclinic
    Login As Owner    ${USERNAME}    ${PASSWORD}
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

Login As Owner
    [Arguments]     ${USERNAME}    ${PASSWORD}
    Input Text      xpath=//input[contains(@name, 'username')]    ${USERNAME}    
    Input Text      xpath=//input[contains(@name, 'password')]    ${PASSWORD}
    Click Button    xpath=//input[contains(@value, '2')]
    Wait Until Page Contains Element    xpath=//button[contains(text(), 'Login')]
    Click Button    xpath=//button[contains(text(), 'Login')]
    Wait Until Page Contains Element    xpath=//h1[contains(text(), 'Welcome to Petclinic')]    timeout=10
