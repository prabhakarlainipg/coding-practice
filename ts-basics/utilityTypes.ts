type User = {
    id: number;
    name: string;
    email: string;
};


    type UpdateUser = Partial<User>;
 const update1: UpdateUser = {
     name: "John"
 }

type UserForm = {
    name?: string;
    email?: string;
    phone?: string;
};
  type RequiredUserForm = Required<UserForm>;

 const form : UserForm = {
     name : "John"
 }

type Roles = "admin" | "user" | "guest";

type RoleLabels = Record<Roles, string>;
const labels: RoleLabels = {
    admin: "Administrator",
    user: "Normal User",
    guest: "Guest User"
};

type Status = "pending" | "success" | "error";

type StatusConfig = Record<Status, { label: string; color: string }>;

const config: StatusConfig = {
    pending: {
        label: "Pending",
        color: "yellow"
    },
    success: {
        label: "Success",
        color: "green"
    },
    error: {
        label: "Error",
        color: "red"
    }
};



type ButtonVariant = "primary" | "secondary" | "danger";

const buttonClasses: Record<ButtonVariant, string> = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    danger: "btn-danger"
};

function getButtonClass(variant: ButtonVariant) {
    return buttonClasses[variant];
}

console.log(getButtonClass("secondary"));



type User2 = {
    id: number;
    name: string;
};

const user2: Readonly<User2> = {
    id: 1,
    name: "Prabhakar"
};

//user2.name = "Rahul"; // error
