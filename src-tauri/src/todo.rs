use serde::{Deserialize, Serialize};
use serde_json::{json, Value};

#[derive(Serialize, Deserialize, Debug)]
pub enum TodoStatus {
    PROCESSING,
    FINISHED,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Todo { 
    id: String,
    title: String,
    description: Option<String>,
    created_at: usize,
    finished_at: Option<usize>,
    status: TodoStatus,
    is_deleted: bool,
}


impl Todo {
    pub fn get_id(&self) -> &String {
        &self.id
    }
}