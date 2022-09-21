package models

type Film struct {
	ID            int              `json:"id"`
	Title         string           `json:"title" gorm:"type: varchar(255)"`
	Thumbnailfilm string           `json:"thumbnailfilm" gorm:"type:varchar(255)"`
	Year          string           `json:"year"  gorm:"type:varchar(255)"`
	CategoryID    int              `json:"-"`
	Category      CategoryResponse `json:"category" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Description   string           `json:"description"  gorm:"type:varchar(255)"`
	Link          string           `json:"link"  gorm:"type:varchar(255)"`
}

type FilmResponse struct {
	ID            int              `json:"id"`
	Title         string           `json:"title"`
	Thumbnailfilm string           `json:"thumbnailfilm"`
	Year          string           `json:"year"`
	CategoryID    int              `json:"-"`
	Category      CategoryResponse `json:"category" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Description   string           `json:"description" gorm:"type: text"`
	Link          string           `json:"link"`
}

func (FilmResponse) TableName() string {
	return "films"
}
