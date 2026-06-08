package main

import (
	"fmt"
	"net/http"
)

func main(){
	fmt.Println("SwipePay API starting...")
	http.ListenAndServe(":8080", nil)
}