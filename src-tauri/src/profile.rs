use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Profile {
    id: String,
    name: String,
    thumbnail_img: Option<String>,
    created_at: usize,
    updated_at: Option<usize>,
}

impl Profile {
    pub fn get_id(&self) -> &String {
        &self.id
    }

    pub fn get_name(&self) -> &String {
        &self.name
    }
}