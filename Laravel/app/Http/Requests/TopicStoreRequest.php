<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TopicStoreRequest extends FormRequest {
    // Determine if the user is authorized to make this request.
    public function authorize(): bool {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array {
        if(request()->isMethod('post')) {
            return [
                'title' => 'required|string',
                'description' => 'required',
                'image' => 'required|image|mimes:jpeg,jpg,png|max:5120'
            ];
        } else {
            return [
                'title' => 'required|string',
                'description' => 'required',
                'image' => 'nullable|image|mimes:jpeg,jpg,png|max:5120'
            ];
        }
    }

    public function messages() {
        if(request()->isMethod('post')) {
            return [
                'title.required' => 'Title is required!',
                'description.required' => 'Description is required!',
                'image.required' => 'Image is required!'
            ];
        } else {
            return [
                'title.required' => 'Title is required!',
                'description.required' => 'Description is required!'
            ];
        }
    }
}