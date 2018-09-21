window.addEventListener("load", function() {
	var a = document.getElementById("a");
	var b = document.getElementById("b");
	var add = document.getElementById("add");
	var result = document.getElementById("result");

	var isAValid = false;
	var isBValid = false;

	a.addEventListener("change", checkValueA);
	b.addEventListener("change", checkValueB);
	add.addEventListener("click", calcResult);

	var xhr = new XMLHttpRequest();


	function formValidation(element, pattern, tooltip) {
		var flag = false;

		if (element.value == "") {
			result.innerHTML = "";
		} else if(pattern.test(element.value)==true && element.value!="") {
			result.innerHTML = "";
			flag = true;
		} else if(pattern.test(element.value)==false && element.value!="") {
			result.innerHTML = tooltip;
		}

		return flag;
	}

	function checkValueA() {
		var pattern = /^[0-9]+$/;
		var tooltip = "Value a may include only digits";
		isAValid = formValidation(this, pattern, tooltip);
	}

	function checkValueB() {
		var pattern = /^[0-9]+$/;
		var tooltip = "Value b may include only digits";
		isBValid = formValidation(this, pattern, tooltip);
	}

	function calcResult() {
		if(isAValid == true && isBValid == true) {
			var valueA = parseFloat(a.value),valueB = parseFloat(b.value);
            xhr.open("POST", "CalcHandler.ashx");

            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    result.innerHTML = "POST " + xhr.responseText;
                }
            }

            xhr.send("a="+valueA+"&b="+valueB);
		}
	}

});