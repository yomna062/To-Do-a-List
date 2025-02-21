//and or

// var x = 0, y = 20;

// console.log(x === 10 || y === 10);

//           0        1         2      3
// var arr = ['Ahmed', 'Abdo', 'Zizo', 'Mena'];

// console.log(arr);
// Add - Remove - ADD&REmove => update
// arr.splice(3, 0, "Hamdy"); // Add
// arr.splice(1, 2) // Remove
// arr.splice(2, 1, "Hamdy") // Update
// console.log(arr);

// if(localStorage.getItem('task')) {
//     console.log('Yes');
// } else  {
//     console.log('No');
// }

var spinner = document.querySelector('.spinner');

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        spinner.classList.replace('d-block', 'd-none');
    }, 600)
})


/****************************************************** HOME PAGE ******************************************/
/****************************************************** HOME PAGE ******************************************/

var taskName = document.getElementById('taskName');
var taskType = document.getElementById('taskType');
var add = document.getElementById('add');
var inputNameAndType = document.querySelectorAll('input[type="text"]');
var row = document.getElementById('rowData');
var searchInputs = document.querySelectorAll('input[type="search"]');
var searchValue = '';

var taskList = JSON.parse(localStorage.getItem('list')) || [];
displayTasks();

add?.addEventListener('click', addTask);

function addTask() {
    if(taskName.value === null || taskType.value === '') {
        Swal.fire({
            icon: "error",
            title: "All Input Required",
            text: "Please Fill All Input",
            confirmButtonColor: 'red'
          });
    } else if (taskName.classList.contains('is-invalid') || taskType.classList.contains('is-invalid')) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Write Correct Data",
            confirmButtonColor: 'red'
          });
    } else  {
        var addNewTask = {
            name: taskName.value,
            type: taskType.value,
        }
        taskList.push(addNewTask);
        localStorage.setItem('list', JSON.stringify(taskList));
        displayTasks();
        clearForm();
        taskName.classList.remove('is-valid');
        taskType.classList.remove('is-valid');
    }
}

if(location.pathname === '/' || location.pathname === 'home.html') {
    if(!localStorage.getItem('token')) {
        location.assign('login.html');
    }
}

if(location.pathname === 'login.html' || location.pathname === 'regeister.html') {
    if(localStorage.getItem('token')) {
        location.assign('home.html');
    }
}

function clearForm(){
    taskName.value = '';
    taskType.value = null;
}

for(var i = 0; i < inputNameAndType.length; i++) {
    inputNameAndType[i].addEventListener('input', function(e) {
        validateForm(e.target)
    });
    
}
// taskName.nextElementSibling
function validateForm(input) {
    var regex = {
        taskName: /^[A-Za-z0-9 -,]{3,}$/,
        taskType: /^[A-Za-z]{2,}$/,
    }

    var msgs = {
        taskName: 'Please enter a valid task name',
        taskType: 'Please enter a valid task type',
    }
    
    if(regex[input.id].test(input.value)) {
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
        input.nextElementSibling.classList.replace('d-block', 'd-none');
    } else  {
        input.classList.add('is-invalid');
        input.nextElementSibling.classList.replace('d-none', 'd-block');
        input.nextElementSibling.innerText = msgs[input.id];
    }
}

function displayTasks() {
    console.log();
    
    var box = '';
    for(var i = 0; i < taskList.length; i++) {
        if(taskList[i].name.toLowerCase().includes(searchValue.toLowerCase()) ||
        taskList[i].type.toLowerCase().includes(searchValue.toLowerCase())) {
            box +=  `
        <div class="col-12 my-3">
                        <div class="inner d-flex justify-content-between bg-success-subtle bg-opacity-25 rounded-4 px-4 py-2">
                            <div>
                                <h3 class="mb-3">${taskList[i].name}</h3>
                                <h4>${taskList[i].type}</h4>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <button type="button" class="btn btn-outline-danger me-3" delete hamda='true' index=${i}><i class="fa-regular fa-trash-can" delete index=${i}></i></button>
                                <button type="button" class="btn btn-outline-warning" update index=${i}><i class="fa-solid fa-pen-to-square" update index=${i}></i></button>
                            </div>
                        </div>
                    </div>`;
        }
    }

    // btn.delte = 'true';
    // btn.delte

    row && (row.innerHTML = box);
};

// var index = '';



document.addEventListener('click', function(e) {
    if(e.target.hasAttribute('update')) {
        updateTask(e.target.getAttribute('index'));
    }
    if(e.target.hasAttribute('delete')) {
        deleteTask(e.target.getAttribute('index'));
    }
});

function deleteTask(index) {
    taskList.splice(index, 1);
        localStorage.setItem('list', JSON.stringify(taskList));
        displayTasks();
}

function updateTask(index) {
    taskName.value = taskList[index].name;
    taskType.value = taskList[index].type;
    add.nextElementSibling.setAttribute('index', index);
    add.nextElementSibling.classList.replace('d-none', 'd-block');
    add.classList.replace('d-block', 'd-none');    
}

add?.nextElementSibling.addEventListener('click', function(e) {
   var updateTask = {
    name: taskName.value,
    type: taskType.value,
   } 
   ;
   taskList.splice(e.target.getAttribute('index'), 1, updateTask);
   localStorage.setItem('list', JSON.stringify(taskList));
   displayTasks();
   e.target.classList.replace('d-block', 'd-none');
   add.classList.replace('d-none', 'd-block');
   clearForm();

})

for(i = 0; i <  searchInputs.length; i++) {
    searchInputs[i].addEventListener('input', function(e) {
        searchValue = e.target.value;
        displayTasks();
    })
}

// function searchInput(input) {
//     var searchValue = input.value;
//     var box = '';
//     for(var i = 0; i < taskList.length; i++) {
        
//         if(taskList[i].name.toLowerCase().includes(searchValue.toLowerCase()) ||
//         taskList[i].type.toLowerCase().includes(searchValue.toLowerCase())) {
//             box +=  `
//         <div class="col-12 my-3">
//                         <div class="inner d-flex justify-content-between bg-success-subtle bg-opacity-25 rounded-4 px-4 py-2">
//                             <div>
//                                 <h3 class="mb-3">${taskList[i].name}</h3>
//                                 <h4>${taskList[i].type}</h4>
//                             </div>
//                             <div class="d-flex justify-content-between align-items-center">
//                                 <button type="button" class="btn btn-outline-danger me-3" delete hamda='true' index=${i}><i class="fa-regular fa-trash-can" delete index=${i}></i></button>
//                                 <button type="button" class="btn btn-outline-warning" update index=${i}><i class="fa-solid fa-pen-to-square" update index=${i}></i></button>
//                             </div>
//                         </div>
//                     </div>`;
//         }
//     }
//     row.innerHTML = box;
    
// }

// taskName.addEventListener('input', validateName)

// function validateName() {    
//     var nameValue = taskName.value;
//     var regexName = /^[A-Za-z0-9 -,]{3,}$/
//     if(regexName.test(nameValue)) {
//         taskName.classList.add('is-valid');
//         taskName.classList.remove('is-invalid');
//     } else  {
//         taskName.classList.add('is-invalid');
//     }
    
// }

// taskType.addEventListener('input', validateType)

// function validateType() {    
//     var typeValue = taskType.value;
//     var regexName = /^[A-Za-z]{2,}$/
//     if(regexName.test(typeValue)) {
//         taskType.classList.add('is-valid');
//         taskType.classList.remove('is-invalid');
//     } else  {
//         taskType.classList.add('is-invalid');
//     }
    
// }





/****************************************************** End 
 * HOME PAGE ******************************************/
/****************************************************** End HOME PAGE ******************************************/