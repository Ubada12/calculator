<?php require 'calculator.php';?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UFT-8">
        <meta name="viewport" charset="width= device-width, initial-scale= 1.0">
        <title>Calculator</title>
        <link rel="stylesheet" href="calculator.css">
        <link href="https://fonts.googleapis.com/css2?family=Inconsolata&display=swap" rel="stylesheet">
        <script src="calculator.js"></script>
        <!-- importing choices.js library for select tag -->
        <!--<script src="https://cdn.jsdelivr.net/npm/choices.js/public/assets/scripts/choices.min.js"></script>  we will add this script dynamically in the program becoz if we import right now then we cant populate dynamic options fro teh select tag thats y we need to import js after the populating the options-->
        <link href="https://cdn.jsdelivr.net/npm/choices.js/public/assets/styles/choices.min.css" rel="stylesheet">
    </head>
    <body>
    <div id="main">
        <div id="history_tab" class="history_tab_hidden">
            <div id="history_data_screen">
                <div id="history_no_data"><img src="images/no_data.gif" alt="no data available"><h4>No Data</h4></div>
            </div>
            <div id="history_btn_screen">
                <button type="button" id="history_btn" onclick="history_clear()">Clear History</button>
            </div>
        </div>
        <div id="calculator">
            <div id="screen">
                <textarea readonly id="inputs"></textarea>
                <textarea readonly id="results"></textarea>
            </div>
            <div id="addons">
                <input type="button" id="history" onclick="addTransitionsForHistory()" style="background-image: url('images/history.png');">
                <input type="button" id="converter" onclick="addTransitionsForConverter()" style="background-image: url('images/exchange.gif'); width: 60px; height: 60px;">
            </div>
            <div id="buttons">
                <button type="button" class="special_btn" id="ac" onclick="clearInput()">AC</button>
                <button type="button" class="special_btn" style="font-size: 50px; line-height: 1;" id="erase" onclick="backspace()">&#x232B;</button>
                <button type="button" class="special_btn" style="font-size: 35px;" id="brackets" onclick="parenthesis()">( )</button>
                <button type="button" class="special_btn" style="font-size: 50px;" id="division" onclick="division()">&divide;</button>
                <button type="button" class="number_btn" id="7">7</button>
                <button type="button" class="number_btn" id="8">8</button>
                <button type="button" class="number_btn" id="9">9</button>
                <button type="button" class="special_btn" style="font-size: 50px;" id="multiplication" onclick="multiplication()">&times;</button>
                <button type="button" class="number_btn" id="4">4</button>
                <button type="button" class="number_btn" id="5">5</button>
                <button type="button" class="number_btn" id="6">6</button>
                <button type="button" class="special_btn" style="font-size: 50px;" id="subtraction" onclick="subtraction()">&minus;</button>
                <button type="button" class="number_btn" id="1">1</button>
                <button type="button" class="number_btn" id="2">2</button>
                <button type="button" class="number_btn" id="3">3</button>
                <button type="button" class="special_btn" style="font-size: 50px;" id="addition" onclick="addition()">&plus;</button>
                <button type="button" id="percentage" onclick="percentage()">%</button>
                <button type="button" class="number_btn" id="0">0</button>
                <button type="button" style="font-size: 50px;" id="point">.</button>
                <button type="button" class="special_btn" style="font-size: 50px;" id="result" onclick="calc_result()">=</button>
            </div>
            <div id="comman_converter_div" class="comman_converter_div_hidden">
                <button type="button" id="close_window">&#x2715;</button>
                <select id="choices">
                </select>
            </div>
        </div>
        <div id="converter_tab" class="converter_tab_hidden">
            <div id="toggle_div">
                <span id="fiat" style="text-align: end; font-weight: bold;">FIAT CURRENCY</span>
                <input type="checkbox" id="toggle">
                <label for="toggle" id="label"></label>
                <span id="crypto">CRYPTO CURRENCY</span>
            </div>
            <form>
                <label for="source-currency">Source Currency:</label>
                <input list="source-currencies" id="source-currency" name="source-currency" readonly>
                <button type="button" id="exchange_sc" class="exchange">></button>
                <input type="text" id="source_currency_value" readonly>

                <button type="button" id="swap_values" onclick="swapValues()"></button>

                <label for="target-currency">Target Currency:</label>
                <input list="target-currencies" id="target-currency" name="target-currency" readonly>
                <button type="button" id="exchange_tc" class="exchange">></button>
                <input type="text" id="target_currency_value" readonly>
                <p style="color: red;"></p>
                </form> 
        </div>
    </div>
    </body>
</html>