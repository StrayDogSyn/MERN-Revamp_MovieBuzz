# Week 6 - React Component Patterns & Composition #

- [Week 6 - React Component Patterns & Composition](#week-6---react-component-patterns--composition)
  - [Reminder](#reminder)
  - [Background](#background)
  - [Learning Objectives](#learning-objectives)
  - [Glossary](#glossary)
  - [Teaching Strategy](#teaching-strategy)
  - [Simple Examples - Teaching Notes](#simple-examples---teaching-notes)
  - [Component Composition](#component-composition)
  - [Building Reusable Components](#building-reusable-components)
  - [Movie Buzz Implementation](#movie-buzz-implementation)
  - [Common Student Challenges](#common-student-challenges)
  - [Code Review Checklist](#code-review-checklist)
  - [Exit Ticket](#exit-ticket)
  - [Assessment Rubric](#assessment-rubric)

---

## Reminder ##

Please remember to start recording the RI session BEFORE the session begins. The check-in question should be present in the recording. Remind students that they are being recorded.

---

## Background ##

Students now have solid React fundamentals including components, props, state management, and event handling. This week introduces advanced component patterns and composition techniques that are essential for building scalable React applications. Students will learn to create reusable UI components and understand how professional React applications are structured. The Movie Buzz application will be enhanced with modal components, loading states, and error handling.

---

## Learning Objectives ##

By the end of this session, learners will be able to:

- Build complex UIs using component composition
- Create reusable component libraries
- Implement loading and error states
- Use advanced prop patterns
- Structure React applications effectively
- Apply container/presentational component patterns
- Handle conditional rendering effectively

---

## Glossary ##

- `Composition`: Building components from other components rather than inheritance
- `Children Prop`: Special prop that allows passing components as data
- `Container Component`: Component that manages state and logic
- `Presentational Component`: Component that focuses on UI display
- `Higher-Order Component (HOC)`: Function that takes a component and returns a new component
- `Render Props`: Pattern for sharing code between components using a prop whose value is a function
- `Compound Components`: Pattern where components work together to form a complete UI

---

## Teaching Strategy ##

### Phase 1: Concept Introduction (15 minutes)
1. **Start with Simple Examples**: Use the Box, SimpleList, and Alert components to demonstrate basic composition concepts
2. **Interactive Demo**: Show how children props work by building examples live
3. **Pattern Recognition**: Help students identify when composition is better than props

### Phase 2: Guided Practice (30 minutes)
1. **Component Composition**: Walk through the children prop and basic composition
2. **Reusable Components**: Build Modal, LoadingSpinner, and ErrorBoundary together
3. **Code-Along**: Students implement alongside instructor

### Phase 3: Movie Buzz Enhancement (25 minutes)
1. **Apply Patterns**: Integrate new patterns into Movie Buzz application
2. **Refactoring Exercise**: Convert existing components to use composition patterns
3. **Testing**: Ensure all functionality works with new patterns

### Phase 4: Review and Assessment (10 minutes)
1. **Code Review**: Students share their implementations
2. **Pattern Discussion**: Identify which patterns solve which problems
3. **Exit Ticket**: Quick assessment of understanding

---

## Simple Examples - Teaching Notes ##

### Example 1: Box Component
**Teaching Focus**: Understanding children prop and basic composition
- Emphasize how `children` is a special prop
- Show multiple ways to pass children (JSX elements, text, etc.)
- Demonstrate prop defaults with destructuring

### Example 2: List and Item Pattern
**Teaching Focus**: Parent-child component relationships
- Show how parent components manage data
- Demonstrate key prop importance in lists
- Explain separation of concerns

### Example 3: Alert Component
**Teaching Focus**: Conditional rendering and prop variations
- Show how props control component behavior
- Demonstrate conditional rendering with `&&` operator
- Explain prop validation concepts

**Common Mistakes to Address**:
- Forgetting `key` prop in lists
- Not understanding when to use composition vs props
- Overcomplicating simple components

---

## Component Composition ##

### Key Teaching Points:
1. **React Philosophy**: "Composition over inheritance"
2. **Children Prop**: How it works and when to use it
3. **Prop Drilling**: Problem identification and solutions
4. **Component Reusability**: Building once, using everywhere

### Live Coding Tips:
- Start with simple examples before complex ones
- Show both working and broken code
- Explain why composition is better than inheritance in React

---

## Building Reusable Components ##

### Modal Component Teaching Notes:
- **Focus**: Event handling, conditional rendering, state management
- **Key Concepts**: Click outside to close, escape key handling, focus management
- **Common Issues**: Event propagation, z-index, accessibility

### Loading Component Teaching Notes:
- **Focus**: Prop variations, default values, CSS integration
- **Key Concepts**: Different loading states, user experience
- **Common Issues**: Loading states not clearing, infinite loading

### Error Boundary Teaching Notes:
- **Focus**: Class components vs functional, error handling patterns
- **Key Concepts**: React error boundaries, fallback UI, error logging
- **Common Issues**: Not catching async errors, poor error messages

---

## Movie Buzz Implementation ##

### Implementation Order:
1. **Add Modal for Movie Forms**: Replace inline forms with modal
2. **Add Loading States**: Show spinners during operations
3. **Add Error Handling**: Display user-friendly error messages
4. **Refactor Components**: Apply composition patterns to existing code

### Code Structure:
```
src/
├── components/
│   ├── UI/
│   │   ├── Modal.js
│   │   ├── LoadingSpinner.js
│   │   └── Alert.js
│   ├── MovieBlock.js
│   ├── MoviesList.js
│   └── MovieForm.js
```

---

## Common Student Challenges ##

### 1. Understanding Children Prop
**Problem**: Students don't understand how children works
**Solution**: Start with simple text children, then move to JSX elements
**Example**: Show `<Button>Click me</Button>` vs `<Button children="Click me" />`

### 2. Event Propagation
**Problem**: Modal closes when clicking inside it
**Solution**: Explain `event.stopPropagation()` with visual diagrams
**Demo**: Show bubbling with nested div clicks

### 3. State Management in Composition
**Problem**: Where to put state when using composition
**Solution**: Use "lift state up" principle, show data flow diagrams
**Practice**: Move state between components in exercises

### 4. Component Responsibility
**Problem**: Components doing too much
**Solution**: Single Responsibility Principle, separate concerns
**Refactor**: Break large components into smaller ones

---

## Code Review Checklist ##

### Component Structure:
- [ ] Components have single responsibility
- [ ] Props are properly typed/validated
- [ ] Default values provided where appropriate
- [ ] Components are reusable

### Composition Patterns:
- [ ] Children prop used appropriately
- [ ] Container/presentational pattern applied
- [ ] No unnecessary prop drilling
- [ ] Components composed rather than inherited

### Error Handling:
- [ ] Loading states implemented
- [ ] Error boundaries catch errors
- [ ] User-friendly error messages
- [ ] Graceful fallbacks provided

### Code Quality:
- [ ] Consistent naming conventions
- [ ] Proper function component structure
- [ ] Clean, readable code
- [ ] Appropriate comments where needed

---

## Exit Ticket ##

### Questions for Student Assessment:

1. **Concept Understanding**: "Explain the difference between composition and inheritance in React. Give an example of when you would use composition."

2. **Practical Application**: "How would you create a reusable Button component that can have different styles and accept any content as children?"

3. **Problem Solving**: "You have a component that needs to show loading states, error messages, and success content. How would you structure this using composition patterns?"

4. **Code Analysis**: Show a component with props drilling and ask: "How could this be refactored using composition patterns to be more maintainable?"

### Expected Answers:
1. Students should explain composition as building components from other components, mentioning children prop
2. Students should describe prop-based styling and children prop usage
3. Students should mention conditional rendering and state management patterns
4. Students should identify component extraction and state lifting solutions

---

## Assessment Rubric ##

### Exceeds Expectations (4):
- Creates complex, reusable components using composition
- Implements multiple patterns (children, render props, etc.)
- Demonstrates deep understanding of React component architecture
- Code is clean, well-structured, and follows best practices

### Meets Expectations (3):
- Successfully implements basic composition patterns
- Creates functional reusable components
- Understands children prop and conditional rendering
- Movie Buzz application enhanced with new patterns

### Approaching Expectations (2):
- Implements some composition concepts with guidance
- Components work but may not be fully reusable
- Basic understanding of patterns but inconsistent application
- Partial completion of Movie Buzz enhancements

### Below Expectations (1):
- Struggles with composition concepts
- Components are not reusable or well-structured
- Requires significant guidance for basic implementations
- Movie Buzz application not successfully enhanced

### Additional Notes:
- Look for creative solutions to component reusability
- Assess understanding through code explanation, not just functionality
- Encourage experimentation with different patterns
- Provide feedback on component architecture decisions