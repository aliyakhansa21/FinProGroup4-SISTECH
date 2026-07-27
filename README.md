# Women Safety Platform, Front End Final Project
SISTECH 2026, Front-end Engineering path, Group 4
Aliya Khansa Kamaliya & Revina Agustin Rahma

## Overview
Women in public spaces face real, frequent safety risks, but often have no reliable way to plan safer routes, report incidents, or get fast help. The Women Safety Platform is designed to give women a way to move through public spaces with less fear and more control. This platform combines prevention (safer routes), protection (SOS and Sharelock), and low-friction anonymous reporting into one unified ecosystem.

## Project Status
- Checkpoint 1, Frontend UI, Anonymous reporting feature, and Deploy the site: done
- Checkpoint 2, Consume API, Interactive heatmap feature, and Safe commute feature: not started yet
- Checkpoint 3, Emergency feature, Performance and responsiveness, and One extra feature: not started yet

## Core Features (MVP Scope)
* **Safe Route Recommendation & Risk Prediction:** Calculates and displays the safest route options along with risk score indicators.
* **Anonymous Incident Reporting:** A 1-tap reporting form that requires no user registration to feed the safety heatmap.
* **Emergency SOS Trigger:** Activates a local alarm and sends live location data to trusted contacts.
* **Smart Shareloc:** Generates temporary, PIN-protected public web links for live location monitoring.

## Tech Stack
* **Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS
* **Language:** JavaScript / React

## Repository Structure

| Path | Description |
|---|---|
| `src/app/` | Contains the main Next.js application routes, page layouts, and global styles (e.g., the reporting page). |
| `src/components/` | Houses reusable UI components, layout elements (Header, MainLayout), and feature-specific blocks (ReportForm, MapPlaceholder). |
| `public/` | Directory for static assets, icons, and images. |

## Getting Started

### Prerequisites
Before you begin, ensure you have the following installed on your machine:
* **[Node.js](https://nodejs.org/)** (v18.0.0 or higher recommended)
* **npm** (comes with Node.js) or **yarn**

### Installation & Execution
To run this project locally, follow these steps:

1. Clone the repository to your local machine:
   `git clone https://github.com/aliyakhansa21/FinProGroup4-SISTECH.git`
2. Navigate to the project directory:
   `cd FinProGroup4-SISTECH`
3. Install the required dependencies:
   `npm install`
4. Start the development server:
   `npm run dev`
5. Open your browser and visit `http://localhost:3000` to view the application.