  var rn = 1; <!--row number, 1ый столбик в таблице-->
        var debt = 10000;
        var interestcharges = 30000;
        var overpayment = 0;
        var payment = 40000;

        <!--Главная функция, которая создает таблицу-->
        function addRow() {


            var month = document.getElementById("month");
            var credit = document.getElementById("credit");
            var table = document.getElementById("table2");
            var rop = credit.value;
            var selectedMonth = month.value;


            <!-- Функция проверки введенных данных. -->
            function check_input() {
                rop = parseInt(rop);
                if (isNaN(rop) || rop === null) {
                    alert('Некорректный ввод. Пожалуйста введите сумму кредита.');
                    window.location.reload()
                }
                else if (rop <= 999999) {
                    alert('Суммы менее  1 000 000 р. не кредитуются.');
                    window.location.reload()
                }
                else if (rop >= 5000000) {
                    alert('Суммы более 5 000 000 р. не кредитуются.');
                    window.location.reload()
                }
            }
            check_input();


            function table_build() {
                var year = 17;
                n = parseInt(rop) / payment;
                n = Math.floor(n);


                <!--Цикл создания таблицы-->
                for (i = 0, rn = 1, thirdcell = interestcharges, selectedMonth; i <= n; i++, rn++,
                    selectedMonth++, overpayment = (overpayment + interestcharges), rop = (rop - payment)) {

                    button1 = document.createElement("button"); <!--Создаем кнопку для последнего столбика и прописываем ей параметры + добавляем класс-->
                    button1.innerText = 'Добавить Платеж';
                    button1.onclick = pay(button1);
                    button1.classList.add("btn");
					button1.classList.add("btn-info");
					
					button1.classList.add("button1");

                    <!--Проверка ввода данных для кнопки "Платеж"-->
                    function pay(button1) {
                        return function () {
                            while (true) {
                                payment_input = prompt("Сумма Платежа");
                                payment_input = parseInt(payment_input);
                                if (isNaN(payment_input)) {
                                    alert('Некорректный ввод. Пожалуйста введите сумму платежа.');
                                }
                                else {
                                    button1.innerHTML = payment_input + " Рублей.";
                                    break;
                                }
                            }
                        }
                    }

                    <!--Изменение цвета строки при наведении-->
                    var row_color_changer = function (row, color) {
                        return function () {
                            row.style.background = color;
                        };
                    };

                    <!-- Прописываем переменные, которые будут использоваться для ввода в ячейки-->
                    var row = document.createElement("tr");
                        row.onmouseover = row_color_changer(row, "#fff7e4");
                        row.onmouseout = row_color_changer(row, "#ffffff");
                    var firstcell = rn;
                    var secondcell = (selectedMonth);
                    var thirdcell = (overpayment + interestcharges + " ₽");
                    var fourthcell = (rop + " ₽");


                    if (rn === 12) {
                        rn = 0;
                        year++
                    }
                    <!--когда подсчет месяца доходит до 13го, до счетчик сбрасывается и показывается опять 1ый месяц-->
                    if (selectedMonth === 12) {
                        selectedMonth = 0
                    }
                    if (rop <= payment) { <!--Если оставшийся платеж меньше суммы платежа, то платеж равен оставшейся непогашенной сумме-->
                        payment = rop
                    }
                    <!--Поэтапно создается строка, потом в строку добавляется 8 ячеек по очереди. Потом создается следующая строка и опять 8 ячеек. Каждой ячейке присваивается стиль, чтобы потом управлять этой ячейкой-->
                    var newrow = table.appendChild(row);
					newrow.classList.add("newrow");
					

                    var cell = row.insertCell(0);
                    cell.innerHTML = firstcell;
                    cell.classList.add("cellstyle");

                    var cell1 = row.insertCell(1);
                    cell1.innerHTML = (secondcell + "." + year );
                    cell1.classList.add("cellstyle");

                    var cell2 = row.insertCell(2);
                    cell2.innerHTML = thirdcell;
                    cell2.classList.add("cellstyle");

                    var cell3 = row.insertCell(3);
                    cell3.innerHTML = fourthcell;
                    cell3.classList.add("cellstyle");

                    var cell4 = row.insertCell(4);
                    cell4.innerHTML = (debt + " ₽");
                    cell4.classList.add("cellstyle");

                    var cell5 = row.insertCell(5);
                    cell5.innerHTML = (interestcharges + " ₽");
                    cell5.classList.add("cellstyle");
					
                    var cell6 = row.insertCell(6);
                    cell6.innerHTML = (payment + " ₽");
                    cell6.classList.add("cellstyle");


                    var cell7 = row.insertCell(7).appendChild(button1);
                    cell7.classList.add("cellStyleButton");
                }
            }

            table_build();
        }