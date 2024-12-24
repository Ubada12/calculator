// https://youtu.be/CO_DAXswOrc?si=YRjByNZzGWtQ4Ijb watch this full video and understand the most important concepts which is bubbling and propagation events in javascript.
// https://www.youtube.com/watch?v=FJZEVmF3eDg ajax 
            let lockPointBtn= false;
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
                document.getElementById('inputs').innerHTML = '';
                document.getElementById('results').innerHTML = '';
            }
            function backspace()
            {
                const textarea= document.getElementById("inputs");
                let str= textarea.value;

                if(str[str.length - 1] === ".")
                lockPointBtn= false;
                textarea.innerHTML= str.substring(0, str.length-1);
            }
            function point()
            {
                const textarea= document.getElementById("inputs");
                let str= textarea.value;

                if((str.length !== 0) && (/^\d$/.test(str[str.length - 1])) && (str[str.length-1] !== ".") && (!lockPointBtn))
                {
                    lockPointBtn= true;
                    document.getElementById('inputs').innerHTML= document.getElementById('inputs').value+'.';
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
                    converter.classList.remove('converter_tab_hidden');
                    converter.classList.add('converter_tab_visible');
                } 
                else 
                {
                    converter.classList.remove('converter_tab_visible');
                    converter.classList.add('converter_tab_hidden');
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
            

            document.addEventListener('DOMContentLoaded', function() {
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

                document.addEventListener("keydown", function(event) {
                    if(event.key === "Enter")
                    {
                        event.preventDefault();
                        calc_result();
                    }
                });

                document.addEventListener('mouseup', function() {
                    setTimeout(function() {
                        const textarea= document.querySelector("textarea");
                        textarea.scrollLeft = textarea.scrollWidth - textarea.clientWidth;// here this whole statement sends the slider pointer to the rightmost here scrollleft is the scrollbar movable slider pointer and scrollwidth is the width of the whole textarea(including the hidden one) and the clientwidth is the width of the textarea which is visible.
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
                for(let i= 0; i < buttons.length; i++)
                {
                    buttons[i].addEventListener("mouseup", function() {
                        setTimeout(function() {
                            try
                            {
                                textarea.innerHTML= setNumberCommas(textarea.value.replace(/,/g, ""));
                                const result= setNumberCommas(eval(validate_input(textarea.value)).toString());
                                document.getElementById("results").innerHTML = result;
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