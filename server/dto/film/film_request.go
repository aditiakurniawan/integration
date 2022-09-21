package filmdto

type FilmRequest struct {
	ID            int    `json:"id" gorm:"primary_key:auto_increment" `
	Title         string `json:"title" form:"title"  gorm:"type: varchar(255)" `
	Thumbnailfilm string `json:"thumbnailfilm" form:"thumbnailfilm" gorm:"type:varchar(255)"`
	Year          string `json:"year" form:"year" gorm:"type: string"`
	Description   string `json:"description" form:"description" gorm:"type: text" `
	CategoryID    int    `json:"category_id" form:"category_id"`
	Link          string `json:"link" form:"link"  gorm:"type: varchar(255)" `
}
