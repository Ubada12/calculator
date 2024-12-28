// https://youtu.be/CO_DAXswOrc?si=YRjByNZzGWtQ4Ijb watch this full video and understand the most important concepts which is bubbling and propagation events in javascript.
// https://www.youtube.com/watch?v=FJZEVmF3eDg ajax 
            let lockPointBtn= false;
            let number_buttons_locked= false;
            let rates= null;
            let clicked_button= null;
            function handle_mousup(textarea_value)
            {
                console.log(textarea_value);
            }
            function percentage()
            {
                lockPointBtn= false;
                const textarea = document.getElementById("inputs");
                let str = textarea.value;

                if(!(str[str.length-1] === "%") && (str.length !== 0) && !(str[str.length-1] === ".") && !(str[str.length-1] === "("))
                textarea.innerHTML = textarea.value + '%';
            }
            function subtraction()
            {
                lockPointBtn= false;
                const textarea = document.getElementById("inputs");
                let str = textarea.value;

                if(str[str.length-1] === "+")
                textarea.innerHTML= str.slice(0, str.length-1) + "-";
                else if(!(str[str.length-1] === "-") && (str.length !== 0) && !(str[str.length-1] === "."))
                textarea.innerHTML = textarea.value + '-';
            }
            function addition()
            {
                lockPointBtn= false;
                const textarea = document.getElementById("inputs");
                let str = textarea.value;

                if(str[str.length-1] === "-")
                textarea.innerHTML= str.slice(0, str.length-1) + "+";
                else if(!(str[str.length-1] === "+") && (str.length !== 0) && !(str[str.length-1] === "."))
                textarea.innerHTML = textarea.value + '+';
            }
            function multiplication()
            {
                lockPointBtn= false;
                const textarea = document.getElementById("inputs");
                let str = textarea.value;

                if(!(str[str.length-1] === "X") && (str.length !== 0) && !(str[str.length-1] === ".") && !(str[str.length-1] === "("))
                textarea.innerHTML = textarea.value + 'X';
            }
            function division()
            {
                lockPointBtn= false;
                const textarea = document.getElementById("inputs");
                let str = textarea.value;

                if(!(str[str.length-1] === "÷") && (str.length !== 0) && !(str[str.length-1] === ".") && !(str[str.length-1] === "("))
                textarea.innerHTML = textarea.value + '÷';
            }
            function parenthesis()
            {
                lockPointBtn= false;
                const textarea = document.getElementById("inputs");
                let str = textarea.value;
    
                // Count the number of opening and closing parentheses
                let openBracks = 0;
                let closeBracks = 0;
    
                // Loop through the string and count parentheses
                for (let i = 0; i < str.length; i++) 
                {
                    if (str[i] === "(") 
                    openBracks++;    
                    else if (str[i] === ")") 
                    closeBracks++;
                }

                // Ensure proper parentheses format
                if (openBracks > closeBracks) {
                    // Add closing parenthesis if there are more opening parentheses
                    textarea.innerHTML = str + ")";
                } else if (openBracks < closeBracks) {
                    // Add opening parenthesis if there are more closing parentheses
                    textarea.innerHTML = str + "(";
                } else {
                    // If there are no parentheses, add an opening parenthesis
                    textarea.innerHTML = str + "(";
                }
            }
            function clearInput()
            {
                lockPointBtn= false;
                const converter_tab= document.getElementById("converter_tab");
                if(converter_tab.classList.contains("converter_tab_hidden"))
                {
                    document.getElementById('inputs').innerHTML = '';
                    document.getElementById('results').innerHTML = '';
                }
                else if(converter_tab.classList.contains("converter_tab_visible"))
                {
                    document.getElementById('source_currency_value').value = '';
                    document.getElementById('target_currency_value').value = '';
                }
            }
            function backspace()
            {
                const sc_input= document.getElementById('source_currency_value');
                const textarea= document.getElementById("inputs");
                const converter_tab= document.getElementById("converter_tab");
                if(converter_tab.classList.contains("converter_tab_hidden"))
                {
                    let str= textarea.value;

                    if(str[str.length - 1] === ".")
                        lockPointBtn= false;

                    textarea.innerHTML= str.substring(0, str.length-1);
                }
                else if(converter_tab.classList.contains("converter_tab_visible"))
                {
                    let str= sc_input.value;
                    sc_input.value = str.substring(0, str.length-1);
                }
                
            }
            function point()
            {
                const converter_tab= document.getElementById("converter_tab");
                const sc_input= document.getElementById('source_currency_value');
                const textarea= document.getElementById("inputs");

                if(converter_tab.classList.contains("converter_tab_hidden"))
                {
                    let str= textarea.value;

                    if((str.length !== 0) && (/^\d$/.test(str[str.length - 1])) && (str[str.length-1] !== ".") && (!lockPointBtn) && (!number_buttons_locked))
                    {
                        lockPointBtn= true;
                        document.getElementById('inputs').innerHTML= document.getElementById('inputs').value+'.';
                    }
                }
                else if(converter_tab.classList.contains("converter_tab_visible") && !sc_input.value.includes("."))
                {
                    sc_input.value+= ".";
                }
            }
            function validate_input(textarea_str)
            {
                if(textarea_str.includes("("))
                {
                    const regex= /\(/g;
                    let indices= [];
                    let match;//this will hold all occurance matched strings and also its index respected and we can acess the matched string by match[0] (to get the fully matched string) and for its index match.index see this match is an object works as key and values
                    while(true)
                    {
                        match= regex.exec(textarea_str);//this exec will give all occurence only if regex is having global flag g, at the first run gives the first occurence information as an object 
                        if(match === null)
                        break;
                        else
                        indices.push(match.index);
                    }
                    let j= 0;
                    for(let i= 0; i < indices.length; i++)
                    {
                        if(!(textarea_str[indices[i]-1] === "X") && !(textarea_str[0] === "("))
                        {
                            textarea_str= textarea_str.slice(0, indices[i]+j) + "*" + textarea_str.slice(indices[i]+j);
                            j++;
                        }
                    }
                }
                textarea_str= textarea_str.replace(/÷/g, "/");// g flag to replace all occurence
                textarea_str= textarea_str.replace(/X/g, "*");
                textarea_str= textarea_str.replace(/,/g, "");
                return textarea_str;
            }
            function calc_result()
            {
                const input= document.getElementById('inputs');
                const results= document.getElementById('results');
                let date= new Date();
                const proper_date= date.getFullYear() +"-"+ (date.getMonth()+1) +"-"+ date.getDate() +" "+ date.getHours() +":"+ date.getMinutes();
                const input_value= input.value;
                const result_value= results.value;

                if(results.value.length !== 0)
                {
                    results.classList.add("hidden");
                    input.classList.add("hidden");

                    setTimeout(function() {
                        if(results.value.length !== 0)
                        {
                            input.innerHTML= results.value;
                            results.innerHTML= '';
                            results.classList.remove("hidden");
                            input.classList.remove("hidden");
                        }
                    }, 350);
                    send_AJAX_request(proper_date, input_value, result_value, "insert");
                    
                }
            }
            function send_AJAX_request(date, input, result, action) 
            {
                const xhr = new XMLHttpRequest();
                xhr.open("POST", "calculator.php", true);
                xhr.setRequestHeader("Content-type", "application/json");
                const params = JSON.stringify({ action: action, time: date, input: input, result: result });
                xhr.onerror = function() {
                    console.error("An error occurred during the AJAX request");
                };
                xhr.onload = function() {
                    if (this.status === 200)
                    {
                        console.log("Successfully sent data to the server");
                        addHistoryData();
                    }    
                    else
                        console.log("Failed to send data");
                };
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        const jsonResponse = JSON.parse(xhr.responseText);
                        console.log('Server Response:', jsonResponse);
                    }
                };
                xhr.send(params);
            }
            function history_clear()
            {
                if (confirm("Do you want to delete all history?"))
                {
                    console.log("User clicked OK");
                    send_AJAX_request("", "", "", "delete");
                    document.getElementById("history_data_screen").innerHTML= `<div id="history_no_data"><img src="images/no_data.gif" alt="no data available"><h4>No Data</h4></div>`;
                }
                else 
                    console.log("User clicked Cancel");
            }
            function addTransitionsForConverter()
            {
                const converter= document.getElementById("converter_tab");

                if (converter.classList.contains('converter_tab_hidden')) 
                {
                    number_buttons_locked= true;
                    converter.classList.remove('converter_tab_hidden');
                    converter.classList.add('converter_tab_visible');
                } 
                else 
                {
                    number_buttons_locked= false;
                    converter.classList.remove('converter_tab_visible');
                    converter.classList.add('converter_tab_hidden');
                    document.getElementById("source-currency").value= "";
                    document.getElementById("target-currency").value= "";
                }
            }

            function addTransitionsForHistory() 
            {
                const history = document.getElementById("history");
                const historyTab = document.getElementById("history_tab");

                // Toggle the background image of the button
                if (history.style.backgroundImage.includes("images/history_after.png")) 
                    history.style.backgroundImage = "url('images/history.png')";
                else 
                    history.style.backgroundImage = "url('images/history_after.png')";

                history.classList.add("history_hidden");
                setTimeout(function() {
                    history.classList.remove("history_hidden");
                }, 500);

                if (historyTab.classList.contains('history_tab_hidden')) 
                {
                    historyTab.classList.remove('history_tab_hidden');
                    historyTab.classList.add('history_tab_visible');
                } 
                else 
                {
                    historyTab.classList.remove('history_tab_visible');
                    historyTab.classList.add('history_tab_hidden');
                }
                addHistoryData();
            }

            function addHistoryData()
            {
                const historyDataScreen= document.getElementById("history_data_screen");
                const xhr = new XMLHttpRequest();
                xhr.open("POST", "calculator.php", true);
                xhr.setRequestHeader("Content-Type", "application/json");

                // Correctly create the data object and stringify it
                const data = JSON.stringify({ action: "result" });

                xhr.onerror = function () {
                    console.error("An error occurred during the AJAX post request");
                };

                xhr.onload = function () {
                    if (xhr.status === 200) {
                        console.log("Successfully sent post request");
                        // Parse the response and log it
                        const jsonResponse = JSON.parse(xhr.responseText);
                        console.log("Server Response:", jsonResponse);

                        if(jsonResponse.status === "present")
                        {
                            if(document.getElementById("history_no_data"))
                                document.getElementById("history_no_data").remove();
                            historyDataScreen.innerHTML= "";
                            for(let i= 0; i<jsonResponse.data.length; i++)
                            {
                                const time= jsonResponse.data[i]['time'];
                                const input= jsonResponse.data[i]['input'];
                                const result= jsonResponse.data[i]['result'];
                                historyDataScreen.innerHTML+= `<div class="history_data"><p class="para_timestamp">Timestamp: `+time+`</p><p class="para_input">Input: `+input+`</p><p class="para_result">Result: `+result+`</p></div><hr>`;
                                historyDataScreen.scrollTop = historyDataScreen.scrollHeight - historyDataScreen.clientHeight;
                            }
                        }
                        else if(jsonResponse.status === "absent")
                        {
                            console.log("No data found");
                            historyDataScreen.innerHTML= `<div id="history_no_data"><img src="images/no_data.gif" alt="no data available"><h4>No Data</h4></div>`;
                        }
                    } else {
                        console.error("Failed to send post request. Status:", xhr.status);
                    }
                };

                // Send the JSON stringified data
                xhr.send(data);
            }

            function insertStringAtIndex(ogStr, index, insertingStr) 
            {
                // Ensure the index is within the bounds of the original string
                if (index < 0 || index > ogStr.length) {
                    return "Error: Index out of bounds";
                }
                // Insert the string at the specified index
                return ogStr.slice(0, index) + insertingStr + ogStr.slice(index);
            }

            function setNumberCommas(str) {
                if (!str.length) return str; // Return the original string if empty
                
                // Match all groups of digits in the string
                const matches = str.match(/\d+/g); 
                if (!matches) return str; // Return the original string if no numbers found
            
                // Iterate over matches and process valid numbers
                matches.forEach(match => {
                    const index = str.indexOf(match); 
                    const precedingChar = index > 0 ? str[index - 1] : "";
            
                    // Skip numbers preceded by '.' or ',' or shorter than 4 digits
                    if (precedingChar === "." || precedingChar === "," || match.length <= 3) return;
            
                    // Add commas to the matched number
                    const formattedNumber = match.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            
                    // Replace original number with formatted number in the string
                    str = str.replace(match, formattedNumber);
                });
            
                return str;
            }
            
            function getExchangeRates()
            {
                return new Promise((resolve, reject) => {
                    const xhr= new XMLHttpRequest();
                    xhr.open("GET", "https://v6.exchangerate-api.com/v6/4e119fd486e9fb60d2aae21c/latest/USD", true);
                    xhr.onerror = function () {
                        reject("An error occurred during the AJAX post request");
                    };
                    xhr.onload = function () {
                        if (xhr.status === 200) 
                        {
                            console.log("Successfully sent get request");
                            // Parse the response and log it
                            const jsonResponse = JSON.parse(xhr.responseText);
                            console.log("Server Response:", jsonResponse);
                            rates= jsonResponse.conversion_rates;
                            // Populate datalists
                            let options = `<option value=""></option>`;
                            for (const key in rates) 
                            {
                                options += `<option value="${key}">${key}</option>`;
                            }
                            resolve(options);
                        }
                        else 
                        {
                            reject("Failed to send get request. Status:", xhr.status);
                        }
                    };
                    xhr.send();
                });
            }

            function currency_exchanger()
            {
                const choice= document.getElementById("choices");
                getExchangeRates()
                    .then((options) => {
                        choice.innerHTML= options; // Populate datalist
                        console.log("Options added to datalist");
                        const script = document.createElement('script');
                        script.src = "https://cdn.jsdelivr.net/npm/choices.js/public/assets/scripts/choices.min.js";//imported js file after populating
                        script.onload = function () {
                            // Initialize Choices.js after the script is loaded
                            const choices = new Choices('#choices', {
                                searchEnabled: true, // Enable search functionality
                                shouldSort: false,   // Maintain the original order
                                placeholder: true,
                                placeholderValue: '🔍 Search'
                            });
                        };
                        document.body.appendChild(script);
                    })
                   .catch((error) => console.error(error));
            }

            function show_converter_div()
            {
                const converter_tab= document.getElementById("comman_converter_div");
                if(converter_tab.classList.contains("comman_converter_div_hidden"))
                {
                        converter_tab.classList.remove("comman_converter_div_hidden");
                        converter_tab.classList.add("comman_converter_div_visible");
                }
            }

            function close()
            {
                const comman_converter_div= document.getElementById("comman_converter_div");
                if(comman_converter_div.classList.contains("comman_converter_div_visible"))
                {
                    comman_converter_div.classList.remove("comman_converter_div_visible");
                    comman_converter_div.classList.add("comman_converter_div_hidden");
                }
            }

            function actual_conversion(sc_symbol, tc_symbol, sc_input) 
            {
                return new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.open("GET", `https://v6.exchangerate-api.com/v6/4e119fd486e9fb60d2aae21c/latest/${sc_symbol}`, true);
            
                    xhr.onerror = function () {
                        reject("An error occurred during the AJAX GET request.");
                    };
            
                    xhr.onload = function () {
                        if (xhr.status === 200) 
                        {
                            console.log("Successfully sent GET request");
            
                            // Parse the response
                            const jsonResponse = JSON.parse(xhr.responseText);
                            console.log("Server Response:", jsonResponse);
            
                            if (jsonResponse.base_code !== sc_symbol) 
                            {
                                reject(`Request was successful, but the source currency (${sc_symbol}) does not match the API response base code (${jsonResponse.base_code}).`);
                                return;
                            }
                            
                            const actual_rate= jsonResponse.conversion_rates[tc_symbol];
                            console.log(`Exchange rate for 1 ${sc_symbol} to ${tc_symbol} is: ${actual_rate}`);
                            const converted_value = sc_input * actual_rate;
                            console.log(`Exchange rate for ${sc_input} ${sc_symbol} to ${tc_symbol} is: ${converted_value}`);
                            resolve(converted_value);
                        } 
                        else 
                        {
                            reject(`Failed to send GET request. HTTP Status: ${xhr.status}`);
                        }
                    };
            
                    xhr.send();
                });
            }
            

            document.addEventListener('DOMContentLoaded', function() {
                currency_exchanger();
                
                const choices= document.getElementById("choices");
                const converter_tab= document.getElementById("comman_converter_div");
                choices.addEventListener("change", function() {
                    if(clicked_button !== null)
                    {
                        if(clicked_button.id === "exchange_sc")
                            document.getElementById("source-currency").value= choices.value;
                        else if(clicked_button.id === "exchange_tc")
                            document.getElementById("target-currency").value= choices.value;
                    }
                    if(converter_tab.classList.contains("comman_converter_div_visible"))
                    {
                        converter_tab.classList.remove("comman_converter_div_visible");
                        converter_tab.classList.add("comman_converter_div_hidden");
                    }
                });

                const options_buttons= Array.from(document.getElementsByClassName("exchange"));
                for(let i= 0; i<options_buttons.length; i++)
                {
                    options_buttons[i].addEventListener("click", function() {
                        show_converter_div();
                        if(converter_tab.classList.contains("comman_converter_div_visible"))
                            clicked_button= options_buttons[i];
                    });
                }

                const close_button= document.getElementById("close_window");
                close_button.addEventListener("click", close);

                const all_buttons= document.querySelectorAll("button, input, textarea");
                for(let i= 0; i< all_buttons.length; i++)
                {
                    all_buttons[i].addEventListener("keydown", function(event) {
                        if (event.key === 'Enter') 
                        {
                            event.preventDefault();  // Prevent the Enter key from adding a new line
                        }
                    });
                }

                const keys= Array.from(document.getElementsByClassName("number_btn"));
                const point_key= document.getElementById("point");
                const currency_tab_div= document.getElementById("converter_tab");
                const sc_input= document.getElementById('source_currency_value');
                const tc_input= document.getElementById('target_currency_value');
                const sc_symbol= document.getElementById('source-currency');
                const tc_symbol= document.getElementById('target-currency');
                if(point_key)
                    keys.push(point_key, document.getElementById("erase"));
                for(let i=0; i<keys.length; i++)
                {
                    keys[i].addEventListener("click", function() {
                        if(keys[i].innerHTML === ".")
                            point();
                        else if(!number_buttons_locked && keys[i].id !== "erase")
                            document.getElementById('inputs').innerHTML= document.getElementById('inputs').value + keys[i].innerHTML;
                        else if(currency_tab_div.classList.contains("converter_tab_visible") && keys[i].id !== "erase")
                            sc_input.value+= keys[i].innerHTML;
                        if(currency_tab_div.classList.contains("converter_tab_visible") && sc_input.value !== 0 && sc_symbol.value !== 0 && tc_symbol.value !== 0)
                        {
                            actual_conversion(sc_symbol.value, tc_symbol.value, sc_input.value)
                                .then((converted_value) => {
                                    tc_input.value= converted_value;
                                })
                                .catch((error) => console.log(error));
                        }
                    });
                }

                document.addEventListener("keydown", function(event) {
                    if(event.key === "Enter")
                    {
                        event.preventDefault();
                        calc_result();
                    }
                });

                document.addEventListener('mouseup', function() {
                    setTimeout(function() {
                        const inputs_buttons= Array.from(document.getElementById("target_currency_value"));
                        inputs_buttons.push(document.querySelector("textarea"), document.getElementById("source_currency_value"), document.getElementById("target_currency_value"));
                        for(let i= 0; i<inputs_buttons.length; i++)
                        {
                            inputs_buttons[i].scrollLeft= inputs_buttons[i].scrollWidth - inputs_buttons[i].clientWidth;
                        }
                    }, 50);
                });//here we add a timeout function becoz the scrollwidth and clientwidth are having different values see we want these values when the mouseup done so when we dont add these timeout function then this values will be of the time when mouse up is down but we want values after mouseup done.

                const buttons= Array.from(document.getElementsByClassName("number_btn"));
                const special_btn= document.getElementById("brackets");
                const backspace= document.getElementById("erase");
                if(special_btn)
                    buttons.push(special_btn);
                if(backspace)
                    buttons.push(backspace);
                const textarea= document.getElementById("inputs");
                const convert_currency_input= document.getElementById("source_currency_value");
                const converter_tab_div= document.getElementById("converter_tab");
                for(let i= 0; i < buttons.length; i++)
                {
                    buttons[i].addEventListener("mouseup", function() {
                        setTimeout(function() {
                            try
                            {
                                if(textarea.innerHTML.length !== 0 && converter_tab_div.classList.contains("converter_tab_hidden"))
                                {
                                    textarea.innerHTML= setNumberCommas(textarea.value.replace(/,/g, ""));
                                    const result= setNumberCommas(eval(validate_input(textarea.value)).toString());
                                    document.getElementById("results").innerHTML = result;
                                }
                                else if(convert_currency_input.value !== 0 && converter_tab_div.classList.contains("converter_tab_visible"))
                                {
                                    convert_currency_input.value= setNumberCommas(convert_currency_input.value.replace(/,/g, ""));
                                }
                            }
                            catch(error)
                            {
                                document.getElementById("results").innerHTML= "";
                                console.log("invalid expression: "+error);
                            }
                        }, 50);
                    });
                }
            });