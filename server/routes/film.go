package routes

import (
	"dumflix/handlers"
	"dumflix/pkg/middleware"
	"dumflix/pkg/mysql"
	"dumflix/repositories"
	"github.com/gorilla/mux"
)

func FilmRoutes(r *mux.Router) {
	filmRepository := repositories.RepositoryFilm(mysql.DB)
	h := handlers.HandlerFilm(filmRepository)

	r.HandleFunc("/films", h.FindFilms).Methods("GET")
	r.HandleFunc("/film/{id}", h.GetFilm).Methods("GET")
	r.HandleFunc("/film", middleware.Auth(middleware.UploadFile(h.CreateFilm))).Methods("POST")
	r.HandleFunc("/film/{id}", middleware.Auth(h.UpdateFilm)).Methods("PATCH")
	r.HandleFunc("/film/{id}", middleware.Auth(h.DeleteFilm)).Methods("DELETE")
	// r.HandleFunc("/film/{id}", middleware.Auth(middleware.CheckAdmin(h.DeleteFilm))).Methods("DELETE")
	// r.HandleFunc("/film", middleware.Auth(middleware.UploadFile(middleware.CheckAdmin((h.CreateFilm))))).Methods("POST")
}
