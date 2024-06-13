import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

function Form({ children, onSubmit, defaultValues }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({ defaultValues });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        {Array.isArray(children)
          ? children.map((child) => {
              return child?.props?.name
                ? React.createElement(child.type, {
                    register,
                    errors: errors[child.props.name],
                    ...child.props,
                    key: child.props.name,
                  })
                : child;
            })
          : children}
      </div>
    </form>
  );
}

export default Form;
