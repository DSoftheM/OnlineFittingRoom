function showHide(element_id) {
		//Если элемент с id-шником element_id существует
		if (document.getElementById(element_id)) { 
			//Записываем ссылку на элемент в переменную obj
			var obj = document.getElementById(element_id); 
			var buttonText = document.getElementById("buttonText"); 
			//Если css-свойство display не block, то: 
			if (obj.style.display != "block") 
			{ 
				obj.style.display = "block"; //Показываем элемент
				buttonText.textContent = "HIDE MODEL";
			}
			else 
			{
				obj.style.display = "none"; //Скрываем элемент
				buttonText.textContent = "VIEW MODEL";
			}
		}
		//Если элемент с id-шником element_id не найден, то выводим сообщение
		else
		{
			alert("Элемент с id: " + element_id + " не найден!"); 
			console.log("Элемент с id: " + element_id + " не найден!"); 
		}
		
	}   