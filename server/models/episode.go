package models

type Episode struct {
	ID            int          `json:"id"`
	Title         string       `json:"title" gorm:"type: varchar(255)"`
	Thumbnailfilm string       `json:"thumbnailfilm" gorm:"type:varchar(255)"`
	Linkfilm      string       `json:"linkfilm" gorm:"type: text"`
	FilmID        int          `json:"film_id"`
	Film          FilmResponse `json:"film" gorm:"films"`
	Description   string       `json:"description" gorm:"type:text" form:"description"`
}

type EpisodeResponse struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

func (EpisodeResponse) TableName() string {
	return "episodes"
}
