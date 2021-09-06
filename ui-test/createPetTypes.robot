*** Settings ***
Documentation     A Test That Test Create Function of Pet Types as Vet
Library           SeleniumLibrary
Library           RequestsLibrary

*** Variables ***
${HOMEURL}    ${URL}:8080
${BROWSER}    Chrome
${USERNAME}    daisy
${PASSWORD}    000000
${PETTYPENAME}    鱷魚

*** Test Cases ***
Create Pet Type As Vet
    [Setup]    Open Browser To Petclinic And Login As Vet
    Create A Pet Type
    [Teardown]    Delete New Pet Type And Close Browser

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

Create A Pet Type
    Click Element    xpath=//a[contains(@routerlink, '/pettypes')]
    Wait Until Page Contains Element    xpath=//h2[contains(text(), 'Pet Types')]
    Wait Until Page Contains Element    xpath=//button[contains(text(), 'Add')]  
    Click Button    xpath=//button[contains(text(), 'Add')]
    Wait Until Page Contains Element    xpath=//h2[contains(text(), 'New Pet Type')]
    Wait Until Page Contains Element    xpath=//input[@name='name'] 
    Input Text    xpath=//input[@name='name']    ${PETTYPENAME}
    Click Button    xpath=//button[contains(text(), 'Save')]
    Wait Until Page Contains Element    xpath=//input[@ng-reflect-model='${PETTYPENAME}' and @ng-reflect-name='pettype_name']
    Page Should Contain Element    xpath=//input[@ng-reflect-model='${PETTYPENAME}' and @ng-reflect-name='pettype_name']

Delete New Pet Type And Close Browser
    Click Button    xpath=//input[@ng-reflect-model='${PETTYPENAME}' and @ng-reflect-name='pettype_name']//parent::td//following-sibling::td[1]//descendant::button[contains(text(), 'Delete')]
    Close Browser