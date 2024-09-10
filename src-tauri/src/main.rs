// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{borrow::Borrow, fs, io::Write, path::{Path, PathBuf}};

use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
mod todo;
mod profile;

use todo::Todo;
use profile::Profile;
use directories::{ProjectDirs};
use lazy_static::lazy_static;

lazy_static! {
  static ref VEGETA_DIR: PathBuf = ProjectDirs::from("", "", "Vegeta").expect("SAVE_PATH 를 불러오는데 실패했습니다.").data_dir().to_owned();
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

fn get_vegeta_dir_path() -> PathBuf {
  let dir_path = VEGETA_DIR.as_path().to_owned();
  let exist = dir_path.exists();

  if !exist {
    fs::create_dir(&dir_path).expect("Vegeta 폴더 생성에 실패했습니다.");
  }

  return dir_path;
}

fn get_todo_file_path() -> PathBuf {
  let vegeta_dir = get_vegeta_dir_path();
  let todo_file = vegeta_dir.clone().join("todo.json");
  
  if !todo_file.exists() {
    fs::write(&todo_file,   r#"{"todos": {}}"#.as_bytes()).expect("todo.json 을 생성하는데 실패했습니다.");
  }

  todo_file
}

fn get_profile_file_path() -> PathBuf {
  let vegeta_dir = get_vegeta_dir_path();
  let profile_file = vegeta_dir.clone().join("profile.json");

  if !profile_file.exists() {
    fs::write(&profile_file,   r#"{"profiles": {}}"#.as_bytes()).expect("profile.json 을 생성하는데 실패했습니다.");
  }

  profile_file
}

#[tauri::command(rename_all = "snake_case")]
fn add_todo(todo_json: &str, profile_id: &str) -> String {
  let todo_struct: Todo = serde_json::from_str(todo_json).expect("todo 파싱도중 에러 발생");
  let id = todo_struct.get_id().to_owned();
  let todo_file = get_todo_file_path();
  let contents = fs::read_to_string(&todo_file).expect("todo.json 을 읽을 수 없습니다.");
  let mut json_contents: Value = serde_json::from_str(&contents).expect("JSON 으로 파싱하는 도중 에러가 발생했습니다.");

  let new_todo = json!(&todo_struct);
  let todo = json_contents["todos"]
      .as_object_mut().unwrap();
  if let None = todo.get(profile_id) {
    todo.insert(profile_id.to_owned(), json!({}));
  }
  json_contents["todos"][profile_id].as_object_mut().unwrap().insert(id, new_todo);
  let updated_json = serde_json::to_string_pretty(&json_contents).expect("Failed to serialize JSON");
  fs::write(&todo_file, &updated_json).expect("TODO 추가에 실패했습니다.");
  return updated_json;
}

#[tauri::command(rename_all = "snake_case")]
fn add_profile(profile_json: &str) -> String {
  let profile_struct: Profile = serde_json::from_str(profile_json).expect("profile 파싱도중 에러");
  let id = profile_struct.get_id().to_owned();
  let profile_file = get_profile_file_path();
  let contents = fs::read_to_string(&profile_file).expect("profile.json 을 읽다가 에러가 발생했습니다.");
  let mut json_contents: Value = serde_json::from_str(&contents).expect("JSON 파싱 도중 에러 발생");

  let new_profile = json!(&profile_struct);

  json_contents["profiles"].as_object_mut().expect("profiles 가 객체가 아닙니다.").insert(id, new_profile);

  let updated_json = serde_json::to_string_pretty(&json_contents).expect("JSON 직렬화 실패");
  fs::write(&profile_file, &updated_json).expect("Profile 추가에 실패했습니다.");
  return updated_json;
}

#[tauri::command(rename_all = "snake_case")]
fn update_todo(todo_json: &str) -> String {
  let todo_struct: Todo = serde_json::from_str(todo_json).unwrap();
  
  let id = todo_struct.get_id().to_owned();
  let todo_file_path = get_todo_file_path();
  let contents = fs::read_to_string(&todo_file_path).expect("todo.json 을 불러오는데 실패했습니다.");
  let mut json_contents: Value = serde_json::from_str(&contents).expect("JSON 으로 파싱도중 에러가 발생했습니다.");
  let updated_todo = json!(&todo_struct);

  json_contents["todos"]
    .as_object_mut()
    .expect("todos 는 객체여야합니다.")
    .insert(id, updated_todo);

  let updated_json = serde_json::to_string_pretty(&json_contents).expect("Failed to serialize JSON");
  fs::write(&todo_file_path, &updated_json).expect("TODO 업데이트에 실패했습니다.");

  return updated_json;
}

#[tauri::command(rename_all = "snake_case")]
fn update_profile(profile_json: &str) -> String {
  let profile_struct: Profile = serde_json::from_str(profile_json).expect("profile 파싱도중 에러");
  let id = profile_struct.get_id().to_owned();
  let profile_file = get_profile_file_path();
  let contents = fs::read_to_string(&profile_file).expect("profile.json 을 읽다가 에러가 발생했습니다.");
  let mut json_contents: Value = serde_json::from_str(&contents).expect("JSON 파싱 도중 에러 발생");

  let new_profile = json!(&profile_struct);

  json_contents["profiles"].as_object_mut().expect("profiles 가 객체가 아닙니다.").insert(id, new_profile);

  let updated_json = serde_json::to_string_pretty(&json_contents).expect("JSON 직렬화 실패");
  fs::write(&profile_file, &updated_json).expect("Profile 업데이트에 실패했습니다.");
  return updated_json;
}

#[tauri::command]
fn get_all_todo() -> String {
  let todo_file_path = get_todo_file_path();
  let contents = fs::read_to_string(&todo_file_path).expect("todo.json 을 읽는데 실패했습니다.");
  return contents;
}

fn get_all_profile() -> String {
    let profile_file = get_profile_file_path();
    let contents = fs::read_to_string(&profile_file).expect("profile.json 을 읽는데 실패했습니다.");
    return contents;
}

fn main() { 
  tauri::Builder::default()
    .plugin(tauri_plugin_oauth::init())
    .invoke_handler(tauri::generate_handler![greet, add_todo, update_todo, get_all_todo])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
