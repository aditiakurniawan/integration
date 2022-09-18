package episodedto

// import "dumflix/models"

type EpisodeResponse struct {
	ID            int    `json:"id" gorm:"primary_key:auto_increment"`
	Title         string `json:"title" from:"title"  gorm:"type: varchar(255)" `
	Thumbnailfilm string `json:"thumbnailfilm" gorm:"type:varchar(255)"`
	Linkfilm      string `json:"Linkfilm" form:"Linkfilm" gorm:"type: text"`
	FilmID        int    `json:"film_id"`
	// Film          models.Film `json:"film" gorm:"films"`
}
