package authdto

type RegisterRequest struct {
	FullName string `gorm:"type: varchar(255)" json:"fullName"`
	Email    string `gorm:"type: varchar(255)" json:"email" validate:"required"`
	Password string `gorm:"type: varchar(255)" json:"password" validate:"required"`
	Gender   string `gorm:"type: varchar(255)" json:"Gender"`
	Phone    string `gorm:"type: varchar(255)" json:"Phone"`
	Address  string `gorm:"type: varchar(255)" json:"Address"`
}

type LoginRequest struct {
	Email    string `gorm:"type: varchar(255)" json:"email" validate:"required"`
	Password string `gorm:"type: varchar(255)" json:"password" validate:"required"`
}
