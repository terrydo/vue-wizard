# Technologies choice

- Vue 3 + Vite + Pinia
- Typescript
- TailwindCSS
- Vitest

## Why Vue 3?

It depends on the client, depend on the requirements. But I would prefer Vue to React.js, because it's related to newcomers. The learning curve of Vue is easier than React, so in my experience, new members are likely to enjoy working with and we could spend less time on human factors.

## Why Typescript?

To reduce the chance of getting application errors as well as more robust code structure. There're a lot of debates about whether or not to use Typescript, because it adds extra difficulty to the project, but after a lot of years working with Javascript, I believe the benefits would outweights the cons.

## Why TailwindCSS?

It's lightweight in production, its IDE suggestion is good, and it provides all necessary classes and utilities for a Front-end developer to create a website.

Besides, adding it to the architecture won't hurt much. It will cost you some effort to install it, a little more build/compilation time, but the building/compilation speed isn't a big trouble when we work with Vite.

## Why Vitest?

Vitest is recommended test framework for Vite because of its compability, as well as blazing fast unit testing speed.

# Architecture

Since Vue is a Framework, we should follow the offical guide for best practices, as well as pre-defined projects structure.

But I'll add some extra folders/details to the project, just to suit my preference, as well as making the code more organized.

The folder structure should look like this:

src\

- assets (Default)
- components (Default)
- router (Default)
- stores (Pinia's Default)
- views (Default)
- models (This will contain interfaces and functions to work with business domain's data (Processing received data from API, preparing data before sending to API,...)

# The approach

First, I'll declare some necessary **models**. They're Insurance interfaces and functions which are used to get data like locations, currencies, rate... I like creating pure functions for easier **Unit testing**, as well as reduce side effects produced while running the code.

The hard part of this test is to create a Wizard which can be reusable. So I decided to make it a component that takes other "step components" to display and abstract away all the hard part (Navigating between steps, chaining actions after navigating,...)

It should looks like this:

```
<AppWizard
      :steps="[
        {
          component: StepOne,
          nextLabel: 'Start',
        },
        {
          component: StepTwo,
          nextLabel: 'Next',
          prevLabel: 'Back',

          onClickNext({ setStep, currentStepIndex }) {
            const age = insuranceBuyForm.age ?? 0;

            if (age <= 0) {
              return window.alert('You must enter a valid age!');
            }

            return setStep(currentStepIndex + 1);
          },
        },
        ...
      ]"
    >
    </AppWizard>
```

Since data from the Second step (The insurance form) needs to be re-used in Step 3, I decided to put the data to Pinia store and worked through Pinia state/actions. The result is in Step 3, I don't have any trouble accessing to the user's submitted data.

# Conclusion

After a few hours, I've manage to build an application that fulfills all the business requirements, having unit tests, the code structure is simple and neat.

**Thanks for inviting me to take part in this test.**
