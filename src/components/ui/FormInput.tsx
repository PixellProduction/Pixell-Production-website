'use client';

import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { clsx } from 'clsx';

// Input component
interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: 'default' | 'floating';
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className, variant = 'default', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && variant === 'default' && (
          <label className="form-label">{label}</label>
        )}
        <div className="relative">
          <input
            ref={ref}
            className={clsx(
              'form-input',
              {
                'border-red-500 focus:border-red-500': error,
              },
              className
            )}
            {...props}
          />
          {label && variant === 'floating' && (
            <label className="absolute left-3 top-3 text-xs text-[var(--subtext)] pointer-events-none">
              {label}
            </label>
          )}
        </div>
        {error && (
          <p className="mt-1 text-xs text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

// Textarea component
interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="form-label">{label}</label>}
        <textarea
          ref={ref}
          className={clsx(
            'form-input form-textarea',
            {
              'border-red-500 focus:border-red-500': error,
            },
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

FormTextarea.displayName = 'FormTextarea';

// Select component
interface FormSelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, error, options, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="form-label">{label}</label>}
        <select
          ref={ref}
          className={clsx(
            'form-input',
            {
              'border-red-500 focus:border-red-500': error,
            },
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-1 text-xs text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

FormSelect.displayName = 'FormSelect';