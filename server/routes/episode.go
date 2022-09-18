package routes

import (
	"dumflix/handlers"
	"dumflix/pkg/middleware"
	"dumflix/pkg/mysql"
	"dumflix/repositories"
	"github.com/gorilla/mux"
)

func EpisodeRoutes(r *mux.Router) {
	episodeRepository := repositories.RepositoryEpisode(mysql.DB)
	h := handlers.HandlerEpisode(episodeRepository)

	r.HandleFunc("/episodes", h.FindEpisodes).Methods("GET")
	r.HandleFunc("/episode/{id}", h.GetEpisode).Methods("GET")
	r.HandleFunc("/episode", middleware.Auth(middleware.UploadFile(h.CreateEpisode))).Methods("POST")
	r.HandleFunc("/episode/{id}", middleware.Auth(h.UpdateEpisode)).Methods("PATCH")
	r.HandleFunc("/episode/{id}", middleware.Auth(h.DeleteEpisode)).Methods("DELETE")
}
