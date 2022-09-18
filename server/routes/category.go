package routes

import (
	"dumflix/handlers"
	"dumflix/pkg/mysql"
	"dumflix/repositories"

	"github.com/gorilla/mux"
)

func CategoryRoutes(r *mux.Router) {
	categoryRepository := repositories.RepositoryCategory(mysql.DB)
	h := handlers.HandlerCategory(categoryRepository)

	r.HandleFunc("/categorys", h.FindCategorys).Methods("GET")
	r.HandleFunc("/category/{id}", h.GetCategory).Methods("GET")
	r.HandleFunc("/category", h.CreateCategory).Methods("POST")
	r.HandleFunc("/category/{id}", h.UpdateCategory).Methods("PATCH")
	r.HandleFunc("/category/{id}", h.DeleteCategory).Methods("DELETE")
}
