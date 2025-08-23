﻿namespace Application.Core;

public class Result<T>
{
    public bool IsSuccess { get; set; }
    public T? Value { get; set; }
    public string? Error { get; set; }
    public int Code { get; set; }
    public static Result<T> Success(T value, int code = 200) => new Result<T>() { IsSuccess = true, Value = value, Code = code };
    public static Result<T> Failed(string error, int code) => new Result<T>() { IsSuccess = false, Error = error, Code = code };
}
