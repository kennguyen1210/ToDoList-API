/* eslint-disable no-unused-vars */
import "./style.css";
import "./App.css";
import { useState, useEffect } from "react";
function App() {
  let [todo, setTodo] = useState([]);
  let [inputValue, setInputValue] = useState("");
  let [call, setCall] = useState(false);
  useEffect(() => {
    let res = fetch("http://localhost:3000/todo");
    res
      .then((result) => result.json())
      .then((data) => {
        setTodo(() => [...data]);
        setCall(() => true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [call]);
  function handleAdd() {
    if (!inputValue) return;
    let data = {
      id: Math.floor(Math.random() * 100000),
      content: inputValue,
      completed: false,
    };
    let res = fetch("http://localhost:3000/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
      }),
    });
    res
      .then((result) => result.json())
      .then((data) => {
        setCall(() => false);
        setInputValue(() => "");
      });
  }
  function handleChange(e) {
    setInputValue(() => e.target.value);
  }

  function handleDelete(id) {
    let check = confirm("Are you really want delete ?");
    if (!check) return;
    let res = fetch(`http://localhost:3000/todo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    res
      .then((result) => result.json())
      .then((data) => {
        setCall(() => false);
      })
      .catch((err) => {
        alert("Delete is not success");
      });
  }

  function handleChecked(id) {
    let res = fetch(`http://localhost:3000/todo/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: true,
      }),
    });
    res
      .then((resuld) => resuld.json())
      .then((data) => {
        setCall(() => false);
      })
      .catch((err) => {
        alert("Checked is not success");
      });
  }
  // GET request : lấy toàn bộ
  // let response = fetch("http://localhost:3000/posts");
  // .then((result) => {
  //   let data = result.json();
  //   return data;
  // }) // Promise
  // response
  //   .then((result) => result.json())
  //   .then((result) => {
  //     console.log(result);
  //     // thực hiện bất kỳ logic nào với dữ liệu
  //     // vừa lấy được từ server tại fontend
  //     // VD: đổ dữ liệu ra các jsx...
  //   });
  // GET request : lấy phần tử với id
  // let response = fetch("http://localhost:3000/posts/2");
  // response.then((result) => result.json()).then((data) => console.log(data));
  // POST request : them moi 1 phan tu
  // let res = fetch("http://localhost:3000/posts", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     id: 4,
  //     title: "random",
  //     author: "random author",
  //   }),
  // });
  // res
  //   .then((result) => result.json())
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // PUT request : update toan bo phan tu
  // PATCH request : update 1 phan
  // let res = fetch("http://localhost:3000/posts/4", {
  //   method: "PATCH",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     title: "Update title",
  //   }),
  // });
  // res
  //   .then((result) => result.json())
  //   .then((data) => {
  //     console.log(data);
  //   });
  // DELETE request
  // let res = fetch("http://localhost:3000/posts/4", {
  //   method: "DELETE",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  // res
  //   .then((result) => result.json())
  //   .then((data) => {
  //     console.log(data);
  //     //logic
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  return (
    <div className="App">
      <div id="myDIV" className="header">
        <h2>My To Do List</h2>
        <input
          type="text"
          id="myInput"
          placeholder="Title..."
          value={inputValue}
          onChange={handleChange}
        />
        <span className="addBtn" onClick={handleAdd}>
          Add
        </span>
      </div>
      <ul id="myUL">
        {todo.map((item, index) => {
          return (
            <li
              key={index}
              className={item.completed ? "checked" : ""}
              onClick={() => handleChecked(item.id)}
            >
              {item.content}
              <span className="close" onClick={() => handleDelete(item.id)}>
                x
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
