
const puppeteer = require("puppeteer");
const colors = require('colors/safe');
const logger  = require("./logger");
const fs = require('fs');

(async () => {
        let i = 0;
        const tokens = fs.readFileSync('output/verified.txt', 'utf-8').toString().replace(/\r\n/g,'\n').split('\n');
       
            for ( i; i <= tokens.length; i++) {
                
            
            const waitForResponse = (page, url) => {
            return new Promise(resolve => {
                page.on("response", function callback(response){
                    if (response.url() === url) {
                        resolve(response);
                        page.removeListener("response",callback)
                    }
                })
            })
                };

            async function main() {
                const tokens = fs.readFileSync('output/verified.txt', 'utf-8').toString().replace(/\r\n/g,'\n').split('\n');
                //const pathToExtension = require('path').join(__dirname, 'proxy-extension');
                const browser = await puppeteer.launch({
                headless: false,
                /*args: [
                `--disable-extensions-except=${pathToExtension}`,
                `--load-extension=${pathToExtension}`,
                ],*/
                });
                
                const targets = await browser.targets();
                const backgroundPageTarget = targets.find(
                (target) => target.type() === 'background_page'
                );
                const page = await browser.newPage();
                page.on('requestfailed', request => {
                    console.log(`url: ${request.url()}, errText: ${request.failure().errorText}, method: ${request.method()}`)
                });
                // Catch console log errors
                page.on("pageerror", err => {
                    console.log(`Page error: ${err.toString()}`);
                });
                await page.setDefaultNavigationTimeout(0); 
                const pageUrl = 'https://discord.com/login?redirect_to=%2Foauth2%2Fauthorize%3Fscope%3Didentify%2520guilds%2520email%26redirect_uri%3Dhttps%253A%252F%252Ftop.gg%252Flogin%252Fcallback%26response_type%3Dcode%26client_id%3D264434993625956352';

                    try {
                        await page.goto(pageUrl, {
                            timeout: 70000
                        });
                        
                    } catch (error) {
                        await browser.close()
                    }

                    
                  

                
                
                        // old theme function
                        
                        function sleep(ms) {
                            return new Promise(resolve => setTimeout(resolve, ms));
                          }

                            async function oldTheme() {

                                try {
                                console.log(i)
                                await page.waitForSelector(".menu.container", {timeout: 0})
                                console.log('Found old menu')
                                await page.click('#menu-trigger')
                                console.log('Click old menu')
                                await page.click('.menu.container a[href^="/login"]')
                                console.log('clicked the login btn')
                                await page.waitForSelector(".marginBottom20-32qID7", {timeout: 70000}) 
                                await page.setBypassCSP(true);
                                await console.log(logger.try(`Trying Logging into the account.`, false))
            
            
                                let tokenTarget = tokens[i]
                
                                await page.evaluate(({tokenTarget}) => {
            
                                    function login(token) {
            
                                        setInterval(() => {
                                        document.body.appendChild(document.createElement `iframe`).contentWindow.localStorage.token = `"${token}"`
                                        }, 50);
                                        setTimeout(() => {
                                        location.reload();
                                        }, 2500);
                                        };
            
                                        login(tokenTarget)
                                
                                },{tokenTarget});
            
                                    await page.waitForSelector(".button-38aScr.lookFilled-1Gx00P.colorBrand-3pXr91.sizeMedium-1AC_Sl.grow-q77ONN", {timeout: 70000})
                                    await page.click('.button-38aScr.lookFilled-1Gx00P.colorBrand-3pXr91.sizeMedium-1AC_Sl.grow-q77ONN')
                                    await sleep(10000)

                                    let [unValidToken] = await page.$x(`//div[@class='colorStandard-2KCXvj size16-1P40sf text-23oMQC']`)
                                    if(unValidToken) {
                                        await console.log(logger.err(`This Token isn't Working: ${tokens[i]}`));
                                    } else if (!unValidToken){
                                    

                                    await page.waitForSelector(".menu.container", {timeout: 70000})
                                    console.log('Going to probot vote page')
                                        await page.goto("https://top.gg/bot/probot/vote", {
                                            timeout: 0
                                        });
                                    let adBTN = await page.$(`.css-122cpje`); // if old ads
                                    if(!adBTN) {
                                        await console.log(logger.try(`Removeing the ad..`))
                                    await page.waitForXPath(`//*[@id="modal-root"]/div[2]/div/a[2]`); // ads BTN
                                    var noThanks = await page.$x(`//*[@id="modal-root"]/div[2]/div/a[2]`) // ads BTN
                                    await noThanks[0].click()
                        
                                    await console.log(logger.try(`Clicking the vote BTN.`))
                        
                                    await page.waitForXPath(`//*[@id="vote-button-container"]/div/button`) // vote BTN
                                    
                                    var voteBTN = await page.$x(`//*[@id="vote-button-container"]/div/button`) // vote BTN
                                    await voteBTN[0].click()
                                    console.log('Clicked old vote BTN')
                                    await setTimeout(async () => {
                                    let [button] = await page.$x("//button[contains(., 'Come back later.')]");
                                    if (button) {
                                        await console.log(logger.info(`Already voted.`))
                                    } else if (!button) {
                                        await console.log(logger.succ(`Voted successfully.`))
                                    }
                                    await browser.close()
                                    }, 2000);
                        
                                    } else if (adBTN){
                                        await console.log(logger.try(`Wait 10 for the ad.`))
                                        await setTimeout(async () => {
                                            await page.waitForXPath(`//*[@id="__next"]/div/div/div[2]/div/div[2]/div/div[1]/main/div[1]/div/div[2]/button`) // vote BTN
                                            var voteBTN = await page.$x(`//*[@id="__next"]/div/div/div[2]/div/div[2]/div/div[1]/main/div[1]/div/div[2]/button`) // vote BTN
                                            await voteBTN[0].click()
                                            console.log('Clicked new vote btn')
    
                                            await setTimeout(async () => {
                                                let [button] = await page.$x(`//*[@id="__next"]/div/div[2]/div/div/div[2]/div/div[1]/main/div[1]/div/div[1]/div/p[1]`)  || await page.$x(`//p[contains(., 'You have voted too many times from this IP.')]`);
                                                if (button) {
                                                    await console.log(logger.info(`Already voted.`))
                                                } else if (!button) {
                                                    await console.log(logger.succ(`Voted successfully.`))
                                                }
                                                await browser.close()
                                                }, 2000);
            
                                        }, 10000);
                                        
                                        
                                    }

                                    }

                                } catch (error) {

                                    if(page) {
                                        browser.close()
                                        i--
                                    } else if (!page) {
                                        i--
                                    }
                                }
    
                                };
                        
                        
                                // new theme function
                                async function newTheme() {
                                        
                                    try {
         

                                    console.log(i + " - " + tokens[i])
    

                                    //await page.waitForSelector(".marginBottom20-32qID7", {timeout: 70000})
                                    await page.setBypassCSP(true);
                                    await console.log(logger.try(`Trying Logging into the account.`, false))
                                    let tokenTarget = tokens[i]
                
                                    await page.evaluate(({tokenTarget}) => {
            
                                        function login(token) {
                
                                            setInterval(() => {
                                            document.body.appendChild(document.createElement `iframe`).contentWindow.localStorage.token = `"${token}"`
                                            }, 50);
                                            setTimeout(() => {
                                            location.reload();
                                            }, 2500);
                                            };
                
                                            login(tokenTarget)
                                    
                                    },{tokenTarget});
            
                                        await page.waitForSelector(".button-f2h6uQ.lookFilled-yCfaCM.colorBrand-I6CyqQ.sizeMedium-2bFIHr.grow-2sR_-F", {timeout: 70000})
                                        //await page.waitForSelector(".button-38aScr.lookFilled-1Gx00P.colorBrand-3pXr91.sizeMedium-1AC_Sl.grow-q77ONN", {timeout: 15000})
                                        await page.click('.button-f2h6uQ.lookFilled-yCfaCM.colorBrand-I6CyqQ.sizeMedium-2bFIHr.grow-2sR_-F', {timeout: 15000})


                                        console.log('go to probot page')
                                        await page.waitForSelector(`.chakra-avatar__initials.css-vn2b1z`);
                                        await page.goto("https://top.gg/bot/probot/vote", {
                                            timeout: 0
                                        });
                                        await page.reload()
                                        let adBTN = await page.$(`.css-122cpje`); // if old ads
                                        if(!adBTN) {
                                            await console.log(logger.try(`Removeing the ad..`))
                                    await page.waitForXPath(`//*[@id="modal-root"]/div[2]/div/a[2]`); // ads BTN
                                    var noThanks = await page.$x(`//*[@id="modal-root"]/div[2]/div/a[2]`) // ads BTN
                                    await noThanks[0].click()
                                    console.log('Click old add btn')
                                    await console.log(logger.try(`Clicking the vote BTN.`))
                                    await page.waitForXPath(`//*[@id="vote-button-container"]/div/button`) // vote BTN
                                    var voteBTN = await page.$x(`//*[@id="vote-button-container"]/div/button`) // vote BTN
                                    await voteBTN[0].click()
                                    console.log('Clicked old vote btn')
                                    await setTimeout(async () => {
                                        let [button] = await page.$x("//button[contains(., 'Come back later.')]");
                                        if (button) {
                                            await console.log(logger.info(`Already voted.`))
                                        } else if (!button) {
                                            await console.log(logger.succ(`Voted successfully.`))
                                        }
                                        await browser.close()
                                        }, 2000);
                                        
                                        } else if (adBTN){
                                            await console.log(logger.try(`Wait 10 sec for the ad.`))
                                            await setTimeout(async () => {
                                                await page.waitForXPath(`//*[@id="__next"]/div/div/div[2]/div/div[2]/div/div[1]/main/div[1]/div/div[2]/button`, {timeout: 0}) // vote BTN
                                                var voteBTN = await page.$x(`//*[@id="__next"]/div/div/div[2]/div/div[2]/div/div[1]/main/div[1]/div/div[2]/button`, {timeout: 0}) // vote BTN
                                                await voteBTN[0].click()
                                                console.log('Clicked new vote btn')
                                                    
                                            }, 10000);
                                            await sleep(11000)
                                            let [banIP] = await page.$x(`//p[contains(., 'You have voted too many times from this IP.')]`),
                                            [button] = await page.$x(`//p[contains(., 'You have already voted for ProBot ✨ in the past 12 hours.')]`);
                                            if(banIP) {
                                                await console.log(logger.info(`This Proxy is banned gonna try another one.`))
                                                await page.waitForSelector(".marginBottom20-32qID7", {timeout: 500}) 

                                            } else if (!banIP){
                                                await console.log(logger.succ(`Voted successfully.`))
						                        await sleep(3000)
                                                console.log(`LINE 246`)
                                                await browser.close()
                                            }
                                            
                                        }
              

                                    } catch (error) {

                                        if(page) {
                                            console.log(`LINE 255 error`)
                                            browser.close()
                                            i--
                                        } else if (!page) {
                                            i--
                                        }
                                    }

                                    

                                    }
    

                    
            
                    setTimeout(() => {
                        console.log('Checking the site theme')
                    }, 1000);
                    try {
                        let menu = await page.$(`.menu.container`);
                        if(menu) {
                            var ipBTN = await page.$x(`/html/body/div[1]/div/div/div/div[2]/div/button[2]`) // changing ip effect;
                            if(!ipBTN) {
    
                                await oldTheme()
                            } else if (ipBTN) {
                                await ipBTN[0].click().then(
                                await oldTheme()
                                )
                            }
                            await oldTheme()
                        } else {
                            await newTheme()
                        }
                    } catch (error) {
                        await console.log(i);
                        await main()
                    }
                };

                
                await main()

            } 
 })();
