# Multi-Step Form

A fully functional **multi-step form** built with **React, TypeScript, Shadcn UI, Tailwind CSS, and React Hook Form (with Zod resolver)**.  
The form is designed with **validation, conditional inputs, and state persistence** across steps.

---

## 📌 Features

### 📝 Step 1: Personal Info

- **Name** – required
- **Email** – required
- **Phone** – input with **country select feature**
- **Birth Date** – calendar date picker
  - Must be in the **past**
  - Cannot be before **1950**
- **Profile Picture**
  - Upload image (max **2MB**)
  - Preview image before submission
  - Option to **remove** and re-upload

---

### 💼 Step 2: Job Details

- **Department Select** – choose department from dropdown
- **Position Title** – text field for job title
- **Start Date** –
  - Can be in the **past** (if meaningful, e.g., backdated join)
  - Can be in the **future** but not more than **90 days ahead**
- **Job Type** – radio select with 3 options:
  - Full-time
  - Part-time
  - Contract
- **Manager Selection** – dynamically updates based on department
- **Salary Expectation** –
  - Slider input
  - Salary range depends on **job type**

---

### 🛠 Step 3: Skills & Preferences

- **Skill Selection**
  - Minimum **3 skills** required
  - Each selected skill unlocks a **related experience text field**
- **Preferred Work Time** – select a time range (e.g., 9 AM – 5 PM)
- **Remote Preference** – percentage slider
  - If **less than 50%**, **manager approval** is required
- **Extra Notes** – optional field if candidate wants to add comments

---

### 📞 Step 4: Emergency Contact

- **Emergency Contact Name** – required
- **Relation** – required (e.g., sibling, friend, spouse)
- **Phone Number** – required, must be valid
- **Guardian Information** (conditional)
  - Required if candidate is **18–21 years old**
  - **Guardian Name** – required
  - **Guardian Phone Number** – required

---

### ✅ Step 5: Review & Submit

- Full **preview** of all steps with provided data
- User can **go back** and edit any step before submission
- A **confirmation switch** must be toggled to enable final submission
- **Final Submit Button** – completes the process

---

## 🌟 Form Overview

- **Progress bar** at the top showing how much of the form is completed
- **State persistence** – every step retains its data even when user moves forward or backward

---

## 🛠️ Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Shadcn UI](https://img.shields.io/badge/Shadcn-000000?style=for-the-badge&logo=radix-ui&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-EC5990?logo=reacthookform&logoColor=fff)

---

## 📖 What I Learned

- Handling **conditional dependencies** between form inputs
- Using **Zod resolver** for schema-based validation
- Maintaining **state across multiple steps** in a form

---

## 📦 Installation

Install this app with npm:

1. Clone the repository:

   ```bash
   git clone https://github.com/Seyam08/react-multi-step-form.git
   ```

2. Install the dependencies:

   ```
   npm install
   ```

3. Start the application:

   Development version

   ```
   npm run dev
   ```

   build command

   ```
   npm run build
   ```

   preview command

   ```
   npm run preview
   ```

4. Open the package.json file to see all the scripts.
