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
                return textarea_str;
            }
            function result()
            {
                const input= document.getElementById('inputs');
                const result= document.getElementById('results');
                let date= new Date();
                const proper_date= date.getHours() +"-"+ date.getMinutes() +"-"+ date.getDate()+1 +"-"+ date.getMonth() +"-"+ date.getFullYear();
                const input_value= input.value;
                const result_value= result.value;

                if(result.value.length !== 0)
                {
                    result.classList.add("hidden");
                    input.classList.add("hidden");

                    setTimeout(function() {
                        if(result.value.length !== 0)
                        {
                            input.innerHTML= result.value;
                            result.innerHTML= '';
                            result.classList.remove("hidden");
                            input.classList.remove("hidden");
                        }
                    }, 350);
                    send_AJAX_request(proper_date, input_value, result_value);
                }
            }
            function send_AJAX_request(date, input, result) 
            {
                const xhr = new XMLHttpRequest();
                xhr.open("POST", "calculator.php", true);
                xhr.setRequestHeader("Content-type", "application/json");
                const params = JSON.stringify({ action: "insert", time: date, input: input, result: result });
                xhr.onerror = function() {
                    console.error("An error occurred during the AJAX request");
                };
                xhr.onload = function() {
                    if (this.status === 200) 
                        console.log("Successfully sent data to the server");
                    else
                        console.log("Failed to send data");
                };
                xhr.send(params);
            }
            function history_clear()
            {
                if (confirm("Do you want to delete all history?"))
                    console.log("User clicked OK");
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
                if (history.style.backgroundImage.includes("history_after.png")) 
                    history.style.backgroundImage = "url('history.png')";
                else 
                    history.style.backgroundImage = "url('history_after.png')";

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

                const history_tab= document.getElementById("history_data_screen");
                if(history_tab.innerHTML.trim().length === 0)
                {
                    console.log("no data");
                }
                else
                {
                    console.log("data is present");
                    console.log(history_tab.innerHTML.trim());
                }

                document.addEventListener("keydown", function(event) {
                    if(event.key === "Enter")
                    {
                        event.preventDefault();
                        result();
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
                                const result= eval(validate_input(textarea.value));
                                // Check if the result is an integer or a floating-point number
                                if (Number.isInteger(result)) {
                                    // If it's an integer, don't apply precision
                                    document.getElementById("results").innerHTML = result;
                                } else {
                                    // If it's a floating-point number, apply precision
                                    const limitedResult = result.toFixed(7);  // Limit to 2 decimal places for floats
                                    document.getElementById("results").innerHTML = limitedResult;
                                }
                            }
                            catch(error)
                            {
                                console.log("invalid expression");
                            }
                        }, 50);
                    });
                }
            });