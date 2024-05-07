# Star Wars Planet Management System

This project is a Star Wars planet management system that allows users to view, add, edit, and delete planets from the list. Additionally, it includes optional features such as search, sorting.

## Key Features

- **View List of Planets:** Users can view a list of all Star Wars planets, including information such as name, diameter, climate, terrain, and number of inhabitants.
- **View Planet Residents:** Users can view specific details of a planet, including basic information and a list of residents of the planet.
- **Add New Planet:** Users can add a new planet to the list.
- **Edit Existing Planet:** Users can edit the information of an existing planet.
- **Delete Planet:** Users can delete a planet from the list.

## Optional Features

- **Planet Search:** Users can search for planets by name.
- **Sorting of Planet List:** Users can sort the list of planets by name.
- **Pagination of Planet List:** Users can view 10 planets per page and navigate between pages. --> not enoght time to finish

## Technologies Used

- **Framework:** React (TypeScript)
- **State Management:** Redux Toolkit
- **API:** SWAPI (Star Wars API)
- **Testing Framework:** Jest and React Testing Library
- **Styling:** CSS Modules
- **Routing:** React Router
- **Other Libraries:** Fetch for API requests

## Project Setup

1. Clone the repository from GitHub:

```bash
git clone https://github.com/marcosbonet/Frontend---Star-Wars---Codetest
```

## Install project dependencies:

1- cd FrontedStart-Wars-codetest/Frontend---Star-Wars---Codetest/
2- npm install
3- curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
4- on termminal put= export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
5- nvm use 20.12.1

## Start the application:

npm run build
npm run dev

### State Management with Redux

This project utilizes Redux Toolkit for state management. The global state is organized into slices, each managing a specific aspect of the application's data. Redux allows for centralized state management and enables efficient communication between components.

### Custom Hooks for Reusability

The project leverages custom hooks to encapsulate logic into reusable modules. Custom hooks enhance code readability and maintainability by separating concerns and promoting code reusability across different components.

### LocalStorage Integration for CRUD Operations

Due to the read-only nature of the SWAPI (Star Wars API), local storage is used to simulate CRUD operations for adding, editing, and deleting planets. This ensures that users can perform these operations within the application, even though changes cannot be persisted to the external API.

### User-Friendly and Discreet Design

The project focuses on a discreet and user-friendly design, prioritizing clean code and scalability over extravagant visual elements. The styling is minimalist to enhance readability and usability.
