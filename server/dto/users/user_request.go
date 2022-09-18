package usersdto

type CreateUserRequest struct {
	FullName  string `json:"fullName" form:"fullName" validate:"required"`
	Email     string `json:"email" form:"email" validate:"required"`
	Password  string `json:"password" form:"password" validate:"required"`
	Gender    string `json:"gender" gorm:"type: varchar(255)"`
	Phone     string `json:"phone" gorm:"type: varchar(255)"`
	Address   string `json:"address" gorm:"type: text"`
	Subscribe string `json:"subscribe" gorm:"type: text"`
}

type UpdateUserRequest struct {
	FullName  string `json:"fullName" form:"fullName" validate:"required"`
	Email     string `json:"email" form:"email"`
	Password  string `json:"password" form:"password"`
	Gender    string `json:"gender" gorm:"type: varchar(255)"`
	Phone     string `json:"phone" gorm:"type: varchar(255)"`
	Address   string `json:"address" gorm:"type: text"`
	Subscribe string `json:"subscribe" gorm:"type: text"`
}
