import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import type { CourseId, CourseMeta } from '../data/lesson'

type CourseSelectorProps = {
  value: CourseId
  size: 'small' | 'medium'
  courses: CourseMeta[]
  disabled?: boolean
  onChange: (courseId: CourseId) => void
}

export function CourseSelector({ value, size, courses, disabled, onChange }: CourseSelectorProps) {
  return (
    <TextField
      select
      size={size}
      label="Course"
      value={value}
      disabled={disabled}
      onChange={(event) => onChange(event.target.value as CourseId)}
      sx={{ minWidth: { xs: '100%', sm: 320 } }}
    >
      {courses.map((item) => (
        <MenuItem key={item.id} value={item.id}>
          {item.meta.course}
        </MenuItem>
      ))}
    </TextField>
  )
}

