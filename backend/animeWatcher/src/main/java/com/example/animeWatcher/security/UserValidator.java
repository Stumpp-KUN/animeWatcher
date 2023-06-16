package com.example.animeWatcher.security;

import com.example.animeWatcher.model.User;
import com.example.animeWatcher.web.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;

@Component
@RequiredArgsConstructor
public class UserValidator {
    private final UserService userService;

    public boolean supports(Class<?> aClass) {
        return User.class.equals(aClass);
    }

    public void validate(Object o, Errors errors) {
        User user = (User) o;
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "nickname", "NotEmpty");
        if (user.getNickname().length() < 6 || user.getNickname().length() > 32) {
            errors.rejectValue("nickname", "Size.userForm.nickname");
        }
        if (userService.findByUsername(user.getNickname()) != null) {
            errors.rejectValue("nickname", "Duplicate.userForm.nickname");
        }
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "password", "NotEmpty");
        if (user.getPassword().length() < 8 || user.getPassword().length() > 32) {
            errors.rejectValue("password", "Size.userForm.password");
        }
        if (!user.getPasswordConfirm().equals(user.getPassword())) {
            errors.rejectValue("passwordConfirm", "Diff.userForm.passwordConfirm");
        }
    }
}
