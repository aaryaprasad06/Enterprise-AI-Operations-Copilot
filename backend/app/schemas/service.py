from pydantic import BaseModel

class ServiceCreate(BaseModel):
    name: str
    owner_team: str
    environment: str

class ServiceResponse(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True