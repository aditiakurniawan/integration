package routes

import (
	"github.com/gorilla/mux"
)

func RouteInit(r *mux.Router) {
	AuthRoutes(r)
	EpisodeRoutes(r)
	UserRoutes(r)
	FilmRoutes(r)
	CategoryRoutes(r)
	TransactionRoutes(r)
}
