package categorydto

type CreateCategoryRequest struct {
	ID   int    `json:"id" gorm:"primary_key:auto_increment"`
	Name string `json:"name" form:"name" validate:"required"`
}

type UpdateCategoryRequest struct {
	ID   int    `json:"id" gorm:"primary_key:auto_increment"`
	Name string `json:"name" form:"name" validate:"required"`
}
