# Jira Clone

A feature-rich task management application inspired by Jira, built with **Next.js**, **TypeScript**, **Honojs**, **Tanstack Query** and **Appwrite**. This project demonstrates a modern tech stack with a focus on user experience, a demo for show my skills.

## Live Demo

Explore the live application here: [Jira Clone](https://jira-clone-3nf7.vercel.app/)

---

## Usage - Step By Step
### Register - Login

Authentication is stored as a cookie

<img width="250" alt="Screenshot 2025-04-27 at 20 12 33" src="https://github.com/user-attachments/assets/d0850b38-5630-47f0-8217-59f4d836c582" />

### Workspace Overview
<img width="1084" alt="Screenshot 2025-04-27 at 20 19 07" src="https://github.com/user-attachments/assets/6844a187-c306-4623-a103-91c303df002d" />

#### Workspace > Project 
**You must add a workspace and a project**<br/>
<img width="280" height="250" alt="Screenshot 2025-04-27 at 20 01 03" src="https://github.com/user-attachments/assets/1eeb8d1a-170c-43c8-9a51-145192d6c71a" />  |
<img width="300" height="250" alt="Screenshot 2025-04-27 at 20 02 02" src="https://github.com/user-attachments/assets/a2773b18-4b55-49bc-b21a-65519e7f50dc" /> 

### Project Overview
#### Sidebar Projects
<img width="255" alt="Screenshot 2025-04-27 at 20 02 37" src="https://github.com/user-attachments/assets/1b07d8ec-e593-4c0c-87a8-f74a7b3e4266" />

#### Create A Task 
Click New Button <br/><br/>
<img width="1083" alt="Screenshot 2025-04-27 at 20 03 01" src="https://github.com/user-attachments/assets/0bb70d46-6a84-48b4-a7d9-46aefed874e8" />
<br/><br/>Assign to someone and select a project when creating a task <br/><br/>
<img width="500" alt="Screenshot 2025-04-27 at 20 03 32" src="https://github.com/user-attachments/assets/2d489a85-5ef6-47da-b769-69ccb2521183" />

---

#### Table Overview

<img width="1067" alt="Screenshot 2025-04-27 at 20 08 37" src="https://github.com/user-attachments/assets/ad3ce502-8886-4a94-8358-bcd74f7ada29" />

---

#### Kanban Overview
<img width="1065" alt="Screenshot 2025-04-27 at 20 09 01" src="https://github.com/user-attachments/assets/01f18aba-f163-4a1c-9d48-f60340ff4b7e" />

---
#### Calendar Overview
<img width="831" alt="Screenshot 2025-04-27 at 20 18 04" src="https://github.com/user-attachments/assets/a137cdee-7a2a-43e3-b041-4a8f0c7fb52e" />

### Workspace Settings 
**You can invite a member to work together under the workspace**
Copy the invite code and send to the member
<img width="542" alt="Screenshot 2025-04-27 at 20 25 49" src="https://github.com/user-attachments/assets/c4e12294-4dbf-4eeb-92a6-1d1e7d3b65ca" />
<br/><br/>The member must accept this invitation<br/><br/>
<img width="610" alt="Screenshot 2025-04-27 at 20 27 42" src="https://github.com/user-attachments/assets/b6ebb84e-0676-4adf-a25b-7621665aca98" />

### Member Settings
**Features**
- Delete the Member 
- Adjust as an admin 
<img width="560" alt="Screenshot 2025-04-27 at 20 28 28" src="https://github.com/user-attachments/assets/bcf4d60a-3450-4d7a-9b91-fae4a507a6a0" />


---

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.dev/)
- **Backend**: [Appwrite](https://appwrite.io/) (end-to-end backend server and database)
- **Hosting**: [Vercel](https://vercel.com/)

---

## 📚 Features

- **User Authentication**: Secure login and registration.
- **Task Management**: Create, update, and manage tasks across multiple projects.
- **Workspaces**: Organize tasks and projects into workspaces.
- **Real-time Updates**: Seamless updates across the app.
- **Responsive Design**: Fully optimized for desktop and mobile devices.

---

## 🖥️ Local Development

Follow these steps to set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/jira-clone.git
   cd jira-clone
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:

   Create a `.env.local` file in the root directory and add the following:

   ```bash
   NEXT_PUBLIC_APPWRITE_ENDPOINT=<Your Appwrite Endpoint>
   NEXT_PUBLIC_APPWRITE_PROJECT=<Your Appwrite Project ID>
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=<Your Appwrite Database ID>
   NEXT_PUBLIC_APPWRITE_WORKSPACES_ID=<Your Workspaces Collection ID>
   NEXT_PUBLIC_APPWRITE_MEMBERS_ID=<Your Members Collection ID>
   NEXT_PUBLIC_APPWRITE_PROJECTS_ID=<Your Projects Collection ID>
   NEXT_PUBLIC_APPWRITE_TASKS_ID=<Your Tasks Collection ID>
   NEXT_PUBLIC_APPWRITE_IMAGES_BUCKET_ID=<Your Images Bucket ID>
   ```
4. Start the development server:
   ```
    npm run dev
    # or
    bun dev
   ```
5. Open http://localhost:3000 in your browser to view the app.


 **Known Issues**
 - Some bugs may exist.
