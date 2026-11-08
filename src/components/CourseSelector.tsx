import MenuItem from "@mui/material/MenuItem"
import TextField from "@mui/material/TextField"
import { Course, CourseId } from "../data/lesson"

type CourseSelectorProps = {
    value: string
    size: "small" | "medium"
    courses: Course[]
    handleCourseChange: (courseId: CourseId) => void
}

export function CourseSelector({ value, size, courses, handleCourseChange }: CourseSelectorProps) {

    return <TextField
        select
        size={size}
        label="Course"
        value={value}
        onChange={(event) => handleCourseChange(event.target.value as CourseId)}
        sx={{ minWidth: { xs: '100%', sm: 320 } }}
    >
        {courses.map((item) => (
            <MenuItem key={item.id} value={item.id}>
                {item.meta.course}
            </MenuItem>
        ))}
    </TextField>
}


