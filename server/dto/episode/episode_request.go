package episodedto

type EpisodeRequest struct {
	ID            int    `json:"id" gorm:"primary_key:auto_increment"`
	Title         string `json:"title" from:"title"  gorm:"type: varchar(255)" `
	Thumbnailfilm string `json:"thumbnailfilm" from:"thumbnailFilm" gorm:"type:varchar(255)"`
	Linkfilm      string `json:"Linkfilm" form:"Linkfilm" gorm:"type: varchar(255)"`
	FilmID        int    `json:"film_id" form:"film_id"`
	Description   string `json:"description" gorm:"type:text" form:"description"`
}
